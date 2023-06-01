import { Component, OnInit } from '@angular/core';
import { Functionality } from '../interfaces/functionality.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionalityService } from '../services/functionality.service';
import { catchError, finalize } from 'rxjs';
import { WorkStatus } from '../enums/workStatus.enum';

@Component({
  selector: 'app-actual-project-edit-functionality',
  templateUrl: './actual-project-edit-functionality.component.html',
  styleUrls: ['./actual-project-edit-functionality.component.css']
})
export class ActualProjectEditFunctionalityComponent implements OnInit{
  functionalityID!: string
  functionality!: Functionality
  editForm!: FormGroup
  isLoading: boolean = false;
  enumValues = Object.values(WorkStatus)

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private functionalityService: FunctionalityService){
      this.editForm = this.formBuilder.group({
        name: ['', Validators.required],
        status: [WorkStatus, Validators.required]
      });
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id !== null) 
        {
          this.functionalityID = id;
        } 
        else 
        {
          this.functionalityID = '';
        }
  
        this.getSingleFunctionality(this.functionalityID);
      });
    }

    getSingleFunctionality(ID:string){
      this.isLoading = true;
      this.functionalityService
        .getSingleFunctionality(ID)
        .pipe(
          catchError(error => {
            console.error(error);
            return error;
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(functionality => {
          this.functionality = functionality as Functionality;
          this.populateForm();
        });
    }

    populateForm() {
      this.editForm.patchValue({
        name: this.functionality.name,
        status: this.functionality.status
      });
    }
    onSubmit(){
      if(this.editForm.invalid)
      {
      return;
      }
      
      const updatedFunctionality: Functionality = {
        ID: this.functionality.ID, 
        name: this.editForm.value.name,
        description: this.functionality.description, 
        priority: this.functionality.priority, 
        project: this.functionality.project, 
        owner: this.functionality.owner, 
        status: this.editForm.value.status,
        addedDate: this.functionality.addedDate, 
        startDate: this.functionality.startDate, 
        endDate: this.functionality.endDate, 
        timeSpent: this.functionality.timeSpent
      }

      console.log(updatedFunctionality)

      this.isLoading = true;
      this.functionalityService
        .updateFunctionality(updatedFunctionality)
        .pipe(
          catchError(error => {
            console.error(error);
            return error;
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(functionality => {
          console.log(functionality)
          this.router.navigate(['/projects/list',this.functionality.project.ID]);
        });
    }
}
