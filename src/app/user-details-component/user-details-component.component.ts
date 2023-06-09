import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../interfaces/task.interface';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-user-details-component',
  templateUrl: './user-details-component.component.html',
  styleUrls: ['./user-details-component.component.css']
})
export class UserDetailsComponentComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'login', 'name', 'surname', 'role' ];
  users: User[] = []
  userOwner: User[] =[]
  userLogin!: string
  taskOptions : Task[] = []
  taskAssigned : Task[] =[]
  taskDone : Task[] = []

  constructor(
    private userService:UserService,
    private route: ActivatedRoute,
    private taskService : TaskService
    ){
    this.userService.getUsers().subscribe((user:User[])=>{
      this.users = user
    })
    this.taskService.getTasks().subscribe((tasks: Task[])=>{
      this.taskOptions = tasks
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const login = params.get('id')
      if(login!== null)
      {
        this.userLogin = login
      }else
      {
        this.userLogin =''
      }
    })

    const userToDisplayDetais = this.users.find((user:User)=> user.login ===this.userLogin)

    
    if(userToDisplayDetais!==undefined)
    {
      this.userOwner.push(userToDisplayDetais)
    }else
    {
      console.log("error z detail user")
    }

    console.log(this.userOwner)
    this.getTaskAssigned()
    this.getTaskDone()
   
  }

  getTaskAssigned()
  {
    this.taskAssigned = this.taskOptions.filter(task=> task.assignedUser?.login === this.userLogin && task.state !== 'Done')
  }

  getTaskDone()
  {
    this.taskDone = this.taskOptions.filter(task=> task.assignedUser?.login === this.userLogin && task.state === 'Done')
  }
}
