import { Component, OnInit } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Functionality } from '../interfaces/functionality.interface';
import { catchError, finalize } from 'rxjs';
import { FunctionalityService } from '../services/functionality.service';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task.interface';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-actual-project-details-component',
  templateUrl: './actual-project-details-component.component.html',
  styleUrls: ['./actual-project-details-component.component.css']
})
export class ActualProjectDetailsComponentComponent implements OnInit {
 functionality!: Functionality
 timeSpent! : number
 allTasks!: Task[] 
 functionalities : Functionality[] = []
 tasksBelongsToFunctionality: Task[] = []
 workingUsers: User[]= []
 functionalityID!: string
 isLoading: boolean = false;
 displayedColumns: string[] = ['name', 'description','priority', 'project', 'owner' , 'status', 'addedDate' , 'startDate' ,'endDate', 'timeSpent'];

  constructor(private route: ActivatedRoute,
    private functionalityService: FunctionalityService,
    private router: Router,
    private taskService: TaskService){
      this.taskService.getTasks().subscribe((tasks:Task[])=>{
        this.allTasks = tasks
      })
    }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) 
      {
        this.functionalityID = id;
      } 
      else 
      {
        this.functionalityID = '';
      }
      this.getFunctionalityTasks()
      this.getSingleFunctionality(this.functionalityID)
      this.getWorkingUsers()
      this.getTimeSpent()

    });
  }

  getSingleFunctionality(ID:string){
    this.isLoading = true;
    this.functionalityService
      .getSingleFunctionality(ID)
      .pipe(
        catchError(error => {
          console.error(error);
          return error;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(functionality => {
        this.functionality = functionality as Functionality;
        this.functionalities.push(this.functionality)
      });
  }
 
  getFunctionalityTasks()
  {
    this.tasksBelongsToFunctionality = this.allTasks.filter(task=>task.functionality.ID === this.functionalityID )
    console.log(this.tasksBelongsToFunctionality)
  }

  getWorkingUsers()
  {
    this.tasksBelongsToFunctionality.forEach(task=>{
      if(task.assignedUser && !this.workingUsers.includes(task.assignedUser))
      {
        this.workingUsers.push(task.assignedUser)
      }
    })
  }

  calculateHoursSinceStartDate(task: Task[]): number 
  {
    const curentDate = new Date()
    let totalHours = 0;

    task.forEach((task)=>{
      const startDate = new Date(task.startDate!)
      console.log(startDate) // task.startDate = 2023-05-30
      
      const timeDifferance = curentDate.getTime() - startDate.getTime()
      console.log(timeDifferance)
      const hoursDifferance = timeDifferance / (1000*60*60)
      console.log(hoursDifferance)
      totalHours += Math.floor(hoursDifferance)
    })
    return totalHours +2
  }

  getTimeSpent(){
    this.timeSpent = this.calculateHoursSinceStartDate(this.tasksBelongsToFunctionality)
  }
  
  
}
