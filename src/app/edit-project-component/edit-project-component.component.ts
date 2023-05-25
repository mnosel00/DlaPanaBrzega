import { Component, OnInit } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit-project-component',
  templateUrl: './edit-project-component.component.html',
  styleUrls: ['./edit-project-component.component.css']
})
export class EditProjectComponentComponent implements OnInit {
  projectId!: string;
  project!: Project;
  editForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) 
      {
        this.projectId = id;
      } 
      else 
      {
        this.projectId = '';
      }

      this.getProject(this.projectId);
    });
  }

  getProject(id: string) {
    this.isLoading = true;
    this.projectService
      .getSingleProject(id)
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
        this.populateForm();
      });
  }

  populateForm() {
    this.editForm.patchValue({
      name: this.project.name,
      description: this.project.description,
    });
  }

  onSubmit(){
    console.log("aaa")
    if(this.editForm.invalid)
    {
      return;
    }

    const updatedProject: Project = {
      ID: this.projectId,
      name: this.editForm.value.name,
      description: this.editForm.value.description,
    };
    console.log(updatedProject)

    this.projectService.updateProject(updatedProject).subscribe(
      () => {
        console.log(updatedProject)
        this.router.navigate(['/projects/list']);
      },
      error => {
        console.error(error);
      }
    );
  }

}


