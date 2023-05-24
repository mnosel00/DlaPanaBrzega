import { Component, OnInit } from '@angular/core';
import { WorkStatus } from '../enums/workStatus.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../interfaces/project.interface';
import { Functionality } from '../interfaces/functionality.interface';
import { FunctionalityService } from '../services/functionality.service';

@Component({
  selector: 'app-create-functionality-component',
  templateUrl: './create-functionality-component.component.html',
  styleUrls: ['./create-functionality-component.component.css']
})
export class CreateFunctionalityComponentComponent implements OnInit {
  enumValues = Object.values(WorkStatus)
  functionalityForm! : FormGroup;
  projectOptions! : Project[];
  

  constructor(
    private formBuilder: FormBuilder,
    private projectService : ProjectService,
    private functionalityService : FunctionalityService,
    private snackBar: MatSnackBar,
    ) 
    {
    }

    ngOnInit() {

      this.projectService.getProjects().subscribe((projects: Project[]) => {
        this.projectOptions = projects;
        console.log(projects)
      });

      this.functionalityForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        priority: ['', Validators.required],
        projectName: ['', Validators.required], 
        owner: ['', Validators.required],
        status: [WorkStatus.Todo, Validators.required]
      });
      
    }

    createFunctionality(){
      if(this.functionalityForm.invalid)
      {
        return;
      }

      const selectedProjectName = this.functionalityForm.value.project;
      const projectToBeSelected = this.projectOptions.find(project=> project.name === selectedProjectName)


      if (!projectToBeSelected) {
        return;
      }

      const functionality: Functionality = {
        name: this.functionalityForm.value.name,
        description: this.functionalityForm.value.description,
        priority: this.functionalityForm.value.priority,
        project: projectToBeSelected,
        owner: this.functionalityForm.value.owner,
        status: this.functionalityForm.value.status
      };

      this.functionalityService.createFunctionality(functionality).subscribe(
        () => {
          console.log(functionality)
          this.snackBar.open('Funkcjonalność została utworzona', 'OK', {
            duration: 2000
          });
        },
        error => {
          this.snackBar.open(
            'Wystąpił błąd podczas tworzenia funkcjonalności',
            'OK',
            {
              duration: 2000
            }
          );
          console.log(error)
        }
      );

    }
}
