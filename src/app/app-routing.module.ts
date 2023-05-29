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


const routes: Routes = [
  {path:'projects/create',component:CreateProjectComponentComponent},
  {path:"create-functionality",component:CreateFunctionalityComponentComponent},
  {path:"create-user",component:CreateUserComponentComponent},
  {path:"create-task",component:CreateTaskComponentComponent},
  {path:"projects/list/:id",component:ActualProjectComponentComponent},
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
