import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogiFormComponentComponent } from '../logi-form-component/logi-form-component.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedInUser: string | null = null;
  isLoggedIn: boolean = true

  constructor(private router: Router,public dialog: MatDialog,private snackBar: MatSnackBar){}

  login()
  {
    const dialogRef = this.dialog.open(LogiFormComponentComponent, {
      width: '300px',
      data: { username: '', password: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.isLoggedIn = false
        this.loggedInUser = result.username;
        console.log(this.loggedInUser)
        console.log("zalogowano pomyślnie ")
      }else{
        this.snackBar.open('Błędne dane logowania ', 'OK', {duration:2000});
      }
    });
  }
  register()
  {
    this.router.navigate(['/create-user'])
  }
  logout()
  {
    this.isLoggedIn = true
    this.loggedInUser = null
  }
  myAccount()
  {
    this.router.navigate(['/user',this.loggedInUser, 'details'])
  }

}