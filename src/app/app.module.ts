import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponentComponent } from './project-list-component/project-list-component.component';

import { CreateProjectComponentComponent } from './create-project-component/create-project-component.component';
import { EditProjectComponentComponent } from './edit-project-component/edit-project-component.component';
import { CreateFunctionalityComponentComponent } from './create-functionality-component/create-functionality-component.component';

import { CreateTaskComponentComponent } from './create-task-component/create-task-component.component';
import { EditTaskComponentComponent } from './edit-task-component/edit-task-component.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './services/project.service';
import { MatListModule } from '@angular/material/list';
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
import { ActualProjectComponentComponent } from './actual-project-component/actual-project-component.component';
import { MatSortModule } from '@angular/material/sort';
import { ActualProjectDetailsComponentComponent } from './actual-project-details-component/actual-project-details-component.component';
import { ActualProjectEditFunctionalityComponent } from './actual-project-edit-functionality/actual-project-edit-functionality.component';
import { TaskDetailsComponentComponent } from './task-details-component/task-details-component.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './navbar/navbar.component';
import { LogiFormComponentComponent } from './logi-form-component/logi-form-component.component';

import { MatDialogModule } from '@angular/material/dialog';
import { UserDetailsComponentComponent } from './user-details-component/user-details-component.component';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { AdminPanelComponentComponent } from './admin-panel-component/admin-panel-component.component';
import { AppEditUserDialogComponent } from './app-edit-user-dialog/app-edit-user-dialog.component';
import { AdminGuard } from './guards/admin.guard';
import { DevopsGuard } from './guards/devops.guard';







@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponentComponent,
    CreateProjectComponentComponent,
    EditProjectComponentComponent,
    CreateFunctionalityComponentComponent,
    CreateTaskComponentComponent,
    EditTaskComponentComponent,
    CreateUserComponentComponent,
    DetailsProjectComponentComponent,
    ActualProjectComponentComponent,
    ActualProjectDetailsComponentComponent,
    ActualProjectEditFunctionalityComponent,
    TaskDetailsComponentComponent,
    NavbarComponent,
    LogiFormComponentComponent,
    UserDetailsComponentComponent,
    DialogComponentComponent,
    AdminPanelComponentComponent,
    AppEditUserDialogComponent,

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
    MatSortModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule
  

  ],
  
  providers: [
    ProjectService,
    FunctionalityService,
    UserService,
    TaskService,
    AdminGuard,
    DevopsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
