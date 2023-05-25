import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  
    createProject(project: Project): Observable<Project> {
      this.projects.push(project);
      this.saveProjectsToLocalStorage();
      return of(project);
    }

    updateProject(project: Project): Observable<Project> {
    const projectToUpdate = this.projects.find(p => p.name === project.name);

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
  
    deleteProject(projectName: string): Observable<boolean> {
      const projectToDeleteIndex = this.projects.findIndex(p => p.name === projectName);

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
  