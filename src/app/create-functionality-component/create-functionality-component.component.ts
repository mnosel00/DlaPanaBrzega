import { Component, OnInit } from '@angular/core';
import { WorkStatus } from '../enums/workStatus.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../interfaces/project.interface';
import { Functionality } from '../interfaces/functionality.interface';
import { FunctionalityService } from '../services/functionality.service';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-functionality-component',
  templateUrl: './create-functionality-component.component.html',
  styleUrls: ['./create-functionality-component.component.css']
})
export class CreateFunctionalityComponentComponent implements OnInit {
  enumValues = Object.values(WorkStatus)
  functionalityForm! : FormGroup;
  projectOptions! : Project[];
  ownerOptions! : User[];
  

  constructor(
    private formBuilder: FormBuilder,
    private projectService : ProjectService,
    private userService : UserService,
    private functionalityService : FunctionalityService,
    private snackBar: MatSnackBar,
    ) 
    {
    }

    ngOnInit() {

      this.projectService.getProjects().subscribe((projects: Project[]) => {
        this.projectOptions = projects;
      });

      this.userService.getUsers().subscribe((users:User[])=>{
        this.ownerOptions = users;
      })

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
      console.log("aaa")
      if(this.functionalityForm.invalid)
      {
        return console.log("invalid")
        
      }

      const selectedProjectName = this.functionalityForm.value.projectName;
      const projectToBeSelected = this.projectOptions.find(project=> project.name === selectedProjectName.name)

      const selectedOwnerLogin = this.functionalityForm.value.owner;
      console.log(selectedOwnerLogin)
      const ownerToBeSelected = this.ownerOptions.find(user=> user.login===selectedOwnerLogin.login)
      


      if (!projectToBeSelected || !ownerToBeSelected) {
        return;
      }

      const functionality: Functionality = {
        ID: Date.now().toString(),
        name: this.functionalityForm.value.name,
        description: this.functionalityForm.value.description,
        priority: this.functionalityForm.value.priority,
        project: projectToBeSelected,
        owner: ownerToBeSelected,
        status: this.functionalityForm.value.status
      };

      this.functionalityService.createFunctionality(functionality).subscribe(
        () => {
          console.log(functionality)
          this.snackBar.open('Funkcjonalność została utworzona', 'OK', {
            duration: 2000
          });
          this.functionalityForm.reset();
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
