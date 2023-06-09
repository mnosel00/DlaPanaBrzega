import { Component, OnInit } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { DevopsGuard } from '../guards/devops.guard';

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
    private devopsGuard:DevopsGuard
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
    this.router.navigate(['/projects/list', project.ID]);
  }

  editProject(project: Project) {
    this.router.navigate(['/projects', project.ID, 'edit']);
  }

  deleteProject(project: Project) {
    if(this.devopsGuard.canActivate())
    {
      this.projectService.deleteProject(project.ID).subscribe(() => {
        this.projects = this.projects.filter(p => p.ID !== project.ID);
      });
    }
   
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
