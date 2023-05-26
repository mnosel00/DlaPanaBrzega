import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { of } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })



  export class ProjectService {

    private localStorageKey = 'projects';
    private projects: Project[] = [];
    
    private loadProjectsFromLocalStorage(): void {
      const projectsData = localStorage.getItem(this.localStorageKey);
      if (projectsData) {
        this.projects = JSON.parse(projectsData);
      }
    }
  
    private saveProjectsToLocalStorage(): void {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.projects));
    }


    constructor() {
      this.loadProjectsFromLocalStorage();
    }
  
    // PROJEKT
    getProjects(): Observable<Project[]> {
      return of(this.projects);
    }

    getSingleProject(ID: string): Observable<Project> {
      const project = this.projects.find(p => p.ID === ID);

      if (project) 
      {
        return of(project);
      } 
      else 
      {
        return throwError(new Error('Project not found'));
      }
    }
  
    createProject(project: Project): Observable<Project> {
      this.projects.push(project);
      this.saveProjectsToLocalStorage();
      return of(project);
    }

    updateProject(project: Project): Observable<Project> {
      console.log(project)
    const projectToUpdate = this.projects.find(p => p.ID === project.ID);

    console.log(projectToUpdate)

    if (projectToUpdate) 
    {
      projectToUpdate.name = project.name;
      projectToUpdate.description = project.description;
      this.saveProjectsToLocalStorage();
      return of(projectToUpdate);
    } 
    else 
    {
      return of();
    }
  }
  
    deleteProject(ID: string): Observable<boolean> {
      const projectToDeleteIndex = this.projects.findIndex(p => p.ID === ID);

    if (projectToDeleteIndex !== -1) {
      this.projects.splice(projectToDeleteIndex, 1);
      this.saveProjectsToLocalStorage();
      return of(true);
    } 
    else 
    {
      return of(false);
    }
    }

    //ZADANIA

  }
  