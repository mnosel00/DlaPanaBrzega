import { Component, OnInit } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Functionality } from '../interfaces/functionality.interface';
import { catchError, finalize } from 'rxjs';
import { FunctionalityService } from '../services/functionality.service';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task.interface';
import { User } from '../interfaces/user.interface';
import { WorkStatus } from '../enums/workStatus.enum';

@Component({
  selector: 'app-actual-project-details-component',
  templateUrl: './actual-project-details-component.component.html',
  styleUrls: ['./actual-project-details-component.component.css']
})
export class ActualProjectDetailsComponentComponent implements OnInit {
 functionality!: Functionality
 workStatus!: WorkStatus
 timeSpent! : number
 allTasks!: Task[] 
 functionalities : Functionality[] = []
 tasksBelongsToFunctionality: Task[] = []
 tasksToDo: Task[] = []
 tasksDoing: Task[] = []
 tasksDone: Task[] = []
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
      this.saveTaskToItsCategory()
      this.checkStatusDoing(this.functionality)
      this.checkStatusDone(this.functionality)

    });
  }

  checkStatusDoing(functionality : Functionality)
  {
    const checkIfAnyIsDoing = this.tasksBelongsToFunctionality.find(f=>f.state === WorkStatus.Doing )

    if(checkIfAnyIsDoing){
      functionality.status = WorkStatus.Doing
      this.functionalityService.updateFunctionality(functionality)
    }
  }

  checkStatusDone(functionality : Functionality)
  { 
    const checkIfAnyIsDoing = this.tasksBelongsToFunctionality.find(f=>f.state === WorkStatus.Done )

    if(checkIfAnyIsDoing){
      functionality.status = WorkStatus.Done
      this.functionalityService.updateFunctionality(functionality)
    }
  }
  createTask()
  {
    this.router.navigate(['/task/create'])
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

  saveTaskToItsCategory()
  {
    this.tasksBelongsToFunctionality.forEach(task=>{
      if(task.state ==="ToDo")
      {
        this.tasksToDo.push(task);
      }
      else if(task.state ==="Doing")
      {
        this.tasksDoing.push(task);
      }
      else if(task.state ==="Done")
      {
        this.tasksDone.push(task);
      }
    })
  }

  getWorkingUsers()
  {
    this.tasksBelongsToFunctionality.forEach(task=>{
      if(task.assignedUser && !this.workingUsers.includes(task.assignedUser))
      {

        const isUserAlreadyAdded = this.workingUsers.some(user => user === task.assignedUser);
      if (!isUserAlreadyAdded) {
        this.workingUsers.push(task.assignedUser);
      }
      }
    })
  }

  calculateHoursSinceStartDate(task: Task[]): number 
  {
    const curentDate = new Date()
    let totalHours = 0;

    task.forEach((task)=>{
      const startDate = new Date(task.startDate!)
      const timeDifferance = curentDate.getTime() - startDate.getTime()
      const hoursDifferance = timeDifferance / (1000*60*60)
      totalHours += Math.floor(hoursDifferance)
    })
    return totalHours +2
  }

  getTimeSpent(){
    this.timeSpent = this.calculateHoursSinceStartDate(this.tasksBelongsToFunctionality)
  }

  goToTaskDetails(task:Task){
    this.router.navigate(['/project/task', task.ID, 'details']);
  }
  
  
}
