import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkStatus } from '../enums/workStatus.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { FunctionalityService } from '../services/functionality.service';
import { User } from '../interfaces/user.interface';
import { Functionality } from '../interfaces/functionality.interface';
import { Task } from '../interfaces/task.interface';

@Component({
  selector: 'app-create-task-component',
  templateUrl: './create-task-component.component.html',
  styleUrls: ['./create-task-component.component.css']
})
export class CreateTaskComponentComponent implements OnInit {
  enumValues = Object.values(WorkStatus)
  taskForm!: FormGroup
  ownerOptions! : User[];
  functionalityOptions! : Functionality[];


  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private taskService : TaskService,
    private userService : UserService,
    private functionalityService: FunctionalityService

  )
  {}

  ngOnInit(): void {

    const currentDate = new Date().toISOString().split('T')[0]; // Dzisiejsza data jako string w formacie "yyyy-mm-dd"

    this.userService.getUsers().subscribe((users:User[])=>{
      this.ownerOptions = users;
    })

    this.functionalityService.getFunctionalities().subscribe((functionalities:Functionality[]) => {
      this.functionalityOptions = functionalities
    })

    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      functionality: ['', Validators.required],
      estimatedTime: ['', Validators.required],
      state: ['', Validators.required],
      addedDate: [{ value: currentDate, disabled: true }],
      startDate: [''],
      endDate: [''],
      assignedUser: ['']
    });

    
  }

  createTask()
  {
    if (this.taskForm.invalid) 
    {
      return console.log("invalid")
    }

    const selectedFunctionalityName = this.taskForm.value.functionality
    const functionalityToBeSelected = this.functionalityOptions.find(f=>f.name === selectedFunctionalityName.name)

    const selectedOwnerLogin = this.taskForm.value.assignedUser;
    const ownerToBeSelected = this.ownerOptions.find(user=> user.login===selectedOwnerLogin.login)

    if(!functionalityToBeSelected || !ownerToBeSelected)
    {
      return;
    }

    const task: Task = {
      ID:Date.now().toString(),
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      priority: this.taskForm.value.priority,
      functionality: functionalityToBeSelected,
      estimatedTime: this.taskForm.value.estimatedTime,
      state: this.taskForm.value.state,
      addedDate: this.taskForm.value.addedDate,
      startDate: this.taskForm.value.startDate || undefined,
      endDate: this.taskForm.value.endDate || undefined,
      assignedUser: ownerToBeSelected || undefined
    };

    this.taskService.createTask(task).subscribe(
      () => {
        this.snackBar.open('Zadanie zostało utworzone', 'OK', {
          duration: 2000
        });
        this.taskForm.reset();
      },
      error => {
        this.snackBar.open(
          'Wystąpił błąd podczas tworzenia zadania',
          'OK',
          {
            duration: 2000
          }
        );
        console.log(error)
      }
    )

  }
}
