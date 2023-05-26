import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponentComponent } from './project-list-component/project-list-component.component';

import { CreateProjectComponentComponent } from './create-project-component/create-project-component.component';
import { EditProjectComponentComponent } from './edit-project-component/edit-project-component.component';
import { CreateFunctionalityComponentComponent } from './create-functionality-component/create-functionality-component.component';
import { EditFunctionalityComponentComponent } from './edit-functionality-component/edit-functionality-component.component';
import { CreateTaskComponentComponent } from './create-task-component/create-task-component.component';
import { EditTaskComponentComponent } from './edit-task-component/edit-task-component.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './services/project.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FunctionalityService } from './services/functionality.service';
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { CreateUserComponentComponent } from './create-user-component/create-user-component.component';
import { DetailsProjectComponentComponent } from './details-project-component/details-project-component.component';



@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponentComponent,
    CreateProjectComponentComponent,
    EditProjectComponentComponent,
    CreateFunctionalityComponentComponent,
    EditFunctionalityComponentComponent,
    CreateTaskComponentComponent,
    EditTaskComponentComponent,
    CreateUserComponentComponent,
    DetailsProjectComponentComponent
  ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule ,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
  

  ],
  
  providers: [
    ProjectService,
    FunctionalityService,
    UserService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
