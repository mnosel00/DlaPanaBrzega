import { Component, OnInit } from '@angular/core';
import { Functionality } from '../interfaces/functionality.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Project } from '../interfaces/project.interface';
import { ProjectService } from '../services/project.service';
import { catchError, finalize } from 'rxjs';
import { FunctionalityService } from '../services/functionality.service';
import { Task } from '../interfaces/task.interface';
import { TaskService } from '../services/task.service';
import { WorkStatus } from '../enums/workStatus.enum';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-details-project-component',
  templateUrl: './details-project-component.component.html',
  styleUrls: ['./details-project-component.component.css']
})
export class DetailsProjectComponentComponent implements OnInit {
 projectID!: string
 project! : Project
 isLoading: boolean = false;
 functionalityOptions!: Functionality[]
 startDate!: string
 timeSpent!: string
 estimatedTime! : number
 functionalitiesBelongToProject!:Functionality[]
 tasksOptions! : Task[]
 manHour!: number
 userOptions! : User[]
 userAssignedToTask!: User[]
 userAssignedToFunctionality!: User[]

 constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private functionalityService: FunctionalityService,
    private taksService: TaskService,
    private userService : UserService
 ){
  this.functionalityService.getFunctionalities().subscribe((functionalities:Functionality[])=>{
    this.functionalityOptions = functionalities
  })

  this.taksService.getTasks().subscribe((tasks:Task[])=>{
    this.tasksOptions = tasks
  })

  this.userService.getUsers().subscribe((users:User[])=>{
    this.userOptions = users
  })
 }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) 
      {
        this.projectID = id;
      } 
      else 
      {
        this.projectID = '';
      }

      this.getSingleProject(this.projectID)
    });

    this.getAllFunctionalitiesBelongToProject()
    this.getTimeFromTask()
    this.usersAssignedToTasks()
    this.usersAssignedToFunctionalities()
  }

  getSingleProject(ID:string){
    this.isLoading = true;
    this.projectService
      .getSingleProject(ID)
      .pipe(
        catchError(error => {
          console.error(error);
          return error;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(project => {
        this.project = project as Project;
      });
  }

  getAllFunctionalitiesBelongToProject()
  {
    this.functionalitiesBelongToProject = this.functionalityOptions.filter(funkcjonalnosc => funkcjonalnosc.project.ID === this.projectID);
    console.log(this.functionalitiesBelongToProject)

    const earliestObject = this.functionalitiesBelongToProject.reduce((earliest, current) => {
      const earliestDate = new Date(earliest.addedDate);
      const currentDate = new Date(current.addedDate);
      return currentDate < earliestDate ? current : earliest;
    });
    
    console.log(earliestObject.addedDate);

    this.startDate = new Date (earliestObject.addedDate).toLocaleDateString()

    const givenDate = new Date(earliestObject.addedDate)
    const currentDate = new Date();

    this.timeSpent = (currentDate.getDay() - givenDate.getDay()).toLocaleString()
  } 

  getTimeFromTask(){
    const functionalitiesIDs = this.functionalitiesBelongToProject.map(f => f.ID)

    console.log(functionalitiesIDs)

    this.estimatedTime = this.tasksOptions.filter(task => functionalitiesIDs.includes(task.functionality.ID) && task.state!==WorkStatus.Done).reduce((total,task)=> total + task.estimatedTime,0)

    const today = new Date()
    this.manHour = this.tasksOptions.filter(task => functionalitiesIDs.includes(task.functionality.ID) && task.state !==WorkStatus.Done).reduce((totalDays,task)=>{
      
      const startDate = new Date(task.startDate!);
      const endDate = task.state === WorkStatus.Done ? new Date (task.endDate!) : today
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime() )
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      return (totalDays + daysDiff)-1
    },0)

    this.manHour = this.manHour*8
  }

  usersAssignedToTasks(){
    const assignedUserIDs = this.tasksOptions.map(task=>task.assignedUser?.ID)
    this.userAssignedToTask = this.userOptions.filter(user => assignedUserIDs.includes(user.ID))
    console.log(this.userAssignedToTask)
  }

  usersAssignedToFunctionalities(){
    const assignedUserIDs = this.functionalityOptions.map(func=>func.owner.ID)
    this.userAssignedToFunctionality = this.userOptions.filter(user=>assignedUserIDs.includes(user.ID))
  }
  
}
