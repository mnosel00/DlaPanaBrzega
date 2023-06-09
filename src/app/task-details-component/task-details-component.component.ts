import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { catchError, finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AppEditTaskDialogComponent } from '../app-edit-task-dialog/app-edit-task-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-details-component',
  templateUrl: './task-details-component.component.html',
  styleUrls: ['./task-details-component.component.css']
})
export class TaskDetailsComponentComponent implements OnInit {
task! : Task
timeSpent! : number
taskID! : string
editedTask:any
isLoading: boolean = false;
tasks: Task[] = []
displayedColumns: string[] = ['name', 'description','priority', 'functionality', 'estimatedTime' , 'state', 'addedDate' , 'startDate' ,'endDate', 'assignedUser'];

constructor(private route: ActivatedRoute,
  private router: Router,
  private dialog: MatDialog,
  private snackBar: MatSnackBar,
  private taskService: TaskService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) 
      {
        this.taskID = id;
      } 
      else 
      {
        this.taskID = '';
      }
    
      this.getSingleFunctionality(this.taskID)
      this.getTimeSpent()

    });
  }

  edit(task: Task, property: keyof Task)
  {
    this.editedTask = task
    const dialogRef = this.dialog.open
    (AppEditTaskDialogComponent, {
      data:{
        task,
        property
      }
    })

    dialogRef.afterClosed().subscribe((value:any)=>{
      if(this.editedTask)
      {
        this.editedTask[property] = value
        this.taskService.updateTask(this.editedTask)

      }
      this.snackBar.open('Zapisano zmiany', '', {
        duration: 2000,
        panelClass: 'snackbar-success'
      });
    })
  }

  getSingleFunctionality(ID:string){
    this.isLoading = true;
    this.taskService
      .getSingleTask(ID)
      .pipe(
        catchError(error => {
          console.error(error);
          return error;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(task => {
        this.task = task as Task;
        this.tasks.push(this.task)
      });
  }

  calculateHoursSinceStartDate(task: Task): number 
  {
    const curentDate = new Date()
    let totalHours = 0;

    
      const startDate = new Date(task.startDate!)
      const timeDifferance = curentDate.getTime() - startDate.getTime()
      const hoursDifferance = timeDifferance / (1000*60*60)
      totalHours += Math.floor(hoursDifferance)
   
    return totalHours +2
  }

  getTimeSpent(){
    this.timeSpent = this.calculateHoursSinceStartDate(this.task)
  }

  createTask()
  {
    this.router.navigate(['/task/create']);
  }
}
