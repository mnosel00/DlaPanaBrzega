import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionalityService } from '../services/functionality.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Functionality } from '../interfaces/functionality.interface';
import { Project } from '../interfaces/project.interface';
import { catchError, finalize } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-actual-project-component',
  templateUrl: './actual-project-component.component.html',
  styleUrls: ['./actual-project-component.component.css']
})
export class ActualProjectComponentComponent implements OnInit{
functionalities : Functionality[] =[];
displayedColumns: string[] = ['name', 'status','filterStatus', 'actions'];
functionalityOptions!: Functionality[]
projectID!: string
isLoading: boolean = false;
project! : Project
functionalitiesBelongToProject: Functionality[] = []
sortedData!: Functionality[];
//dataSource!: MatTableDataSource<Functionality>


//@ViewChild(MatSort) sorter!: MatSort;

  constructor(
    private functionalityService: FunctionalityService, 
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    ){
      this.functionalityService.getFunctionalities().subscribe((functionalities:Functionality[])=>{
        this.functionalityOptions = functionalities
      })
      console.log(this.functionalityOptions)
      
    }

   sortData(sort:Sort)
    {
      
      const data = this.functionalitiesBelongToProject.slice()
      if(!sort.active || sort.direction ==='')
      {
        this.sortedData = data
        return
      }

      this.sortedData = data.sort((a,b)=>{
        const isAsc = sort.direction ==='asc'

        if(sort.active==="status")
        {
          return this.compare(a.status,b.status, isAsc)
        }else{
          return 0;
        }
      })
    }

    compare(a: number | string, b: number | string, isAsc: boolean){
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
    
    applyFilterByStatus(filterValue: string) {
      filterValue = filterValue.trim().toLowerCase();
      this.sortedData = this.functionalitiesBelongToProject.filter(functionality => {
        return functionality.status.toLowerCase().includes(filterValue);
      });
    }
    onFilterStatus(event: KeyboardEvent) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.applyFilterByStatus(filterValue);
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
      this.sortedData = this.functionalitiesBelongToProject.slice()
      console.log(this.sortedData)
      console.log(this.functionalitiesBelongToProject)
      
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
