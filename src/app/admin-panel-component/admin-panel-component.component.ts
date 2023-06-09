import { Component, OnInit,Inject  } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppEditUserDialogComponent } from '../app-edit-user-dialog/app-edit-user-dialog.component';


@Component({
  selector: 'app-admin-panel-component',
  templateUrl: './admin-panel-component.component.html',
  styleUrls: ['./admin-panel-component.component.css']
})
export class AdminPanelComponentComponent implements OnInit {
  userOptions: User[] = []
  displayedColumns: string[] = [ 'login', 'passwd', 'name', 'surname', 'actions'];
  editedUser: User | null = null;

  constructor(
    private userService : UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  )
  { 
    this.userService.getUsers().subscribe((users:User[])=>{
      this.userOptions = users
    })
  }
  ngOnInit(): void {
    
  }

  edit(user: User, property: keyof User)
  {
    this.editedUser = user
    const dialogRef = this.dialog.open(AppEditUserDialogComponent, {
      data:{
        user,
        property
      }
    })
    
   dialogRef.afterClosed().subscribe((value:any)=>{
    console.log(value)
    console.log(property)
    if(this.editedUser)
    {
      this.editedUser[property] = value

      this.userService.updateUser(this.editedUser)
    }

    this.snackBar.open('Zapisano zmiany', '', {
      duration: 2000,
      panelClass: 'snackbar-success'
    });

   })
   
  }

  delete(user: User)
  {
    this.userService.deleteUser(user.ID).subscribe(()=>{
      this.userOptions = this.userOptions.filter(u=>u.ID !== user.ID)
    })
  }
}
