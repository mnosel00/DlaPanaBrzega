import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { Functionality } from '../interfaces/functionality.interface';
import { Task } from '../interfaces/task.interface';
import { of } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })



  export class ProjectService {

    private projects: Project[] =[];
    private functionalities: Functionality[] =[];
    private tasks: Task[] =[];


    constructor() {
      this.projects = [
        {
          name:"P1",
          description:"To jest projekt który powinien zaliczyć mi P1"
        }
      ]
    }
  
    getProjects(): Observable<Project[]> {
      return of(this.projects);
    }
  
    createProject(project: Project): Observable<Project> {
      this.projects.push(project);
      return of(project);
    }
   
  
    updateProject(project: Project): Observable<Project> {
      const projectToUpdate = this.projects.find(p => p.name === project.name);

      if (projectToUpdate) 
      {
        projectToUpdate.name = project.name;
        projectToUpdate.description = project.description;
        return of(projectToUpdate);
      } 
      else 
      {
        return of();
      }
    }
  
    deleteProject(projectName: string): Observable<void> {
      const projectToDeleteIndex = this.projects.findIndex(p => p.name === projectName);

      if (projectToDeleteIndex !== -1) {
        this.projects.splice(projectToDeleteIndex, 1);
      }
      return of();
    }
    
  }
  