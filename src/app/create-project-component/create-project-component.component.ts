import { Component,OnInit  } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project.interface';


@Component({
  selector: 'app-create-project-component',
  templateUrl: './create-project-component.component.html',
  styleUrls: ['./create-project-component.component.css'],
})
export class CreateProjectComponentComponent implements OnInit {
  projectForm! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projectService : ProjectService,
    private snackBar: MatSnackBar
    ) {}


    ngOnInit() {
      this.projectForm = this.formBuilder.group({
        name:['',Validators.required],
        description:['',Validators.required]
      });
    }

    createProject() {

      if(this.projectForm.invalid)
      {
        return;
      }

      const project: Project = {
        name: this.projectForm.value.name,
        description: this.projectForm.value.description
      };

      this.projectService.createProject(project)
          .subscribe(
            ()=>{
              console.log(project)
              this.snackBar.open('Projekt utworzony !', 'OK', { duration: 2000});
              this.projectForm.reset();
            },
            error => {
              this.snackBar.open('Wystąpił błąd podczas tworzenia projektu ', 'OK', {duration:2000});
              console.log(error)
            }
            
          )
    }
}

