import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponentComponent } from './create-project-component/create-project-component.component';
import { from } from 'rxjs';
import { EditProjectComponentComponent } from './edit-project-component/edit-project-component.component';
import { ProjectDetailsComponentComponent } from './project-details-component/project-details-component.component';
import { ProjectListComponentComponent } from './project-list-component/project-list-component.component';
import { DeleteProjectComponentComponent } from './delete-project-component/delete-project-component.component';
import { CreateFunctionalityComponentComponent } from './create-functionality-component/create-functionality-component.component';
import { CreateUserComponentComponent } from './create-user-component/create-user-component.component';
import { CreateTaskComponentComponent } from './create-task-component/create-task-component.component';


const routes: Routes = [
  {path:"create-project",component:CreateProjectComponentComponent},
  {path:"create-functionality",component:CreateFunctionalityComponentComponent},
  {path:"create-user",component:CreateUserComponentComponent},
  {path:"create-task",component:CreateTaskComponentComponent},
  {path:"edit-project/:id",component:EditProjectComponentComponent},
  {path:"project-details/:id",component:ProjectDetailsComponentComponent},
  {path:"project-list",component:ProjectListComponentComponent},
  {path:"delete-project/:id",component:DeleteProjectComponentComponent},
  {path:"",redirectTo:"project-list", pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
