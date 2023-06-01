import { Injectable } from "@angular/core";
import { Task } from "../interfaces/task.interface";
import { Observable, of, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })


  export class TaskService {
    private localStorageKey = 'tasks';
    private tasks :Task[] = [];

    private loadTaskFromLocalStorage(): void {
        const projectsData = localStorage.getItem(this.localStorageKey);
        if (projectsData) {
          this.tasks = JSON.parse(projectsData);
        }
      }
    
      private saveTaskToLocalStorage(): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
      }
  
  
      constructor() {
        this.loadTaskFromLocalStorage();
      }


      getTasks(): Observable<Task[]>{
        return of(this.tasks);
      }

      getSingleTask(ID: string): Observable<Task> {
        const task = this.tasks.find(p => p.ID === ID);
  
        if (task) 
        {
          return of(task);
        } 
        else 
        {
          return throwError(new Error('Task not found'));
        }
      }
  
      createTask(task:Task): Observable<Task>{
        this.tasks.push(task);
        this.saveTaskToLocalStorage();
        return of(task)
      }
  
      updateTask(task: Task): Observable<Task>{
        const taskToUpdate = this.tasks.find(u=>u.name === task.name);
  
        if(taskToUpdate)
        {
          taskToUpdate.name = task.name
          taskToUpdate.description = task.description
          taskToUpdate.priority = task.priority
          taskToUpdate.functionality = task.functionality
          taskToUpdate.estimatedTime = task.estimatedTime
          taskToUpdate.state = task.state
          taskToUpdate.addedDate = task.addedDate
          taskToUpdate.startDate = task.startDate
          taskToUpdate.endDate = task.endDate
          taskToUpdate.assignedUser = task.assignedUser
          this.saveTaskToLocalStorage();
          return of(taskToUpdate)
        }
        else
        {
          return of()
        }
      }
  
      deleteTask(taskName: string): Observable<boolean>{
        const index = this.tasks.findIndex(t=>t.name === taskName);
  
        if (index !== -1) 
        {
          this.tasks.splice(index, 1);
          this.saveTaskToLocalStorage();
          return of(true);
        } 
        else 
        {
          return of(false);
        }
      }
  }
