import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponentComponent } from './project-list-component/project-list-component.component';
import { ProjectDetailsComponentComponent } from './project-details-component/project-details-component.component';
import { CreateProjectComponentComponent } from './create-project-component/create-project-component.component';
import { EditProjectComponentComponent } from './edit-project-component/edit-project-component.component';
import { CreateFunctionalityComponentComponent } from './create-functionality-component/create-functionality-component.component';
import { EditFunctionalityComponentComponent } from './edit-functionality-component/edit-functionality-component.component';
import { CreateTaskComponentComponent } from './create-task-component/create-task-component.component';
import { EditTaskComponentComponent } from './edit-task-component/edit-task-component.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponentComponent,
    ProjectDetailsComponentComponent,
    CreateProjectComponentComponent,
    EditProjectComponentComponent,
    CreateFunctionalityComponentComponent,
    EditFunctionalityComponentComponent,
    CreateTaskComponentComponent,
    EditTaskComponentComponent
  ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
