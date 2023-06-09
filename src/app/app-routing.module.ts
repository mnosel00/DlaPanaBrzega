import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponentComponent } from './create-project-component/create-project-component.component';
import { from } from 'rxjs';
import { EditProjectComponentComponent } from './edit-project-component/edit-project-component.component';
import { ProjectListComponentComponent } from './project-list-component/project-list-component.component';

import { CreateFunctionalityComponentComponent } from './create-functionality-component/create-functionality-component.component';
import { CreateUserComponentComponent } from './create-user-component/create-user-component.component';
import { CreateTaskComponentComponent } from './create-task-component/create-task-component.component';
import { DetailsProjectComponentComponent } from './details-project-component/details-project-component.component';
import { ActualProjectComponentComponent } from './actual-project-component/actual-project-component.component';
import { ActualProjectDetailsComponentComponent } from './actual-project-details-component/actual-project-details-component.component';
import { ActualProjectEditFunctionalityComponent } from './actual-project-edit-functionality/actual-project-edit-functionality.component';
import { TaskDetailsComponentComponent } from './task-details-component/task-details-component.component';
import { UserDetailsComponentComponent } from './user-details-component/user-details-component.component';
import { AdminPanelComponentComponent } from './admin-panel-component/admin-panel-component.component';




const routes: Routes = [
  {path:'projects/create',component:CreateProjectComponentComponent},
  {path:"functionality/create",component:CreateFunctionalityComponentComponent},
  {path:"create-user",component:CreateUserComponentComponent},
  {path:"task/create",component:CreateTaskComponentComponent},
  {path:'project/task/:id/details', component:TaskDetailsComponentComponent},
  {
    path:"projects/list/:id",
    component:ActualProjectComponentComponent, 
  },
  {
    path: "projects/list/:id/details",component:ActualProjectDetailsComponentComponent
  },
  {
    path: "projects/list/:id/edit",component:ActualProjectEditFunctionalityComponent
  },
  {
    path: "users/list", component:AdminPanelComponentComponent 
  },
  {path: "user/:id/details",component: UserDetailsComponentComponent},
  {path:"projects/:id/edit",component:EditProjectComponentComponent},
  {path:"projects/:id/details",component:DetailsProjectComponentComponent},
  {path:"projects/list",component:ProjectListComponentComponent},
  {path:"",redirectTo:"projects/list", pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
