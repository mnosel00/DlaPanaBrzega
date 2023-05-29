import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionalityService } from '../services/functionality.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Functionality } from '../interfaces/functionality.interface';
import { Project } from '../interfaces/project.interface';
import { catchError, finalize } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-actual-project-component',
  templateUrl: './actual-project-component.component.html',
  styleUrls: ['./actual-project-component.component.css']
})
export class ActualProjectComponentComponent implements OnInit{
functionalities : Functionality[] =[];
displayedColumns: string[] = ['name', 'status', 'actions'];
functionalityOptions!: Functionality[]
projectID!: string
isLoading: boolean = false;
project! : Project
functionalitiesBelongToProject: Functionality[] = []

@ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(
    private functionalityService: FunctionalityService, 
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    ){
      this.functionalityService.getFunctionalities().subscribe((functionalities:Functionality[])=>{
        this.functionalityOptions = functionalities
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
      this.getFunctionalities()
      
    });
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

  getFunctionalities(){
    this.functionalitiesBelongToProject = this.functionalityOptions.filter(f => f.project.ID === this.projectID)
    console.log(this.functionalitiesBelongToProject)

  }

  editFunctionality(functionality:Functionality){

  }

  deleteFunctionality(functionality:Functionality){

  }

  viewFunctionalityDetails(functionality:Functionality)
  {

  }


}
