import { Component, OnInit } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list-component',
  templateUrl: './project-list-component.component.html',
  styleUrls: ['./project-list-component.component.css']
})
export class ProjectListComponentComponent implements OnInit {
  projects: Project[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(
    private projectService: ProjectService, 
    private router: Router,
    )
     { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects: Project[])=>{
      this.projects = projects
    })
  }

  goToProject(project: Project) {
    // Przenieś się do komponentu projektu (np. ProjectComponent) i przekaż identyfikator projektu
    this.router.navigate(['/projects', project.ID]);
  }

  editProject(project: Project) {
    this.router.navigate(['/projects', project.ID, 'edit']);
  }

  deleteProject(project: Project) {
    // Wywołaj metodę serwisu usuwającego projekt i zaktualizuj listę projektów
    this.projectService.deleteProject(project.ID);
    this.getProjects();
  }

  viewProjectDetails(project: Project) {
    // Przenieś się do komponentu szczegółów projektu (np. ProjectDetailsComponent) i przekaż identyfikator projektu
    this.router.navigate(['/projects', project.ID, 'details']);
  }

  createProject() {
    // Przenieś się do komponentu tworzenia nowego projektu (np. CreateProjectComponent)
    this.router.navigate(['/projects/create']);
  }
}
