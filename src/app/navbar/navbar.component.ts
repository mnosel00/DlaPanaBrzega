import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogiFormComponentComponent } from '../logi-form-component/logi-form-component.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedInUser: string | null = null;
  isLoggedIn: boolean = true
  userOptions: User[] =[]
  isAdmin: boolean = false

  constructor(
    private router: Router,
    private userService:UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar)
    {
      this.userService.getUsers().subscribe((users:User[])=>{
        this.userOptions = users
      })
    }

  ngOnInit(): void 
  {
    const loggedInUser = localStorage.getItem('loggedInUser');
    console.log(loggedInUser)

    if (loggedInUser) 
    {
      this.isLoggedIn = false;
      this.loggedInUser = loggedInUser;
    }

      const foundUser = this.userOptions.find(u=>u.login === this.loggedInUser)

    if(foundUser?.role==='Admin')
    {
        this.isAdmin=true
    }

  }

  goToUserList()
  {
    this.router.navigate(['/users/list'])
  }
  login()
  {
    const dialogRef = this.dialog.open(LogiFormComponentComponent, {
      width: '300px',
      data: { username: '', password: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.isLoggedIn = false
        this.loggedInUser = result.username ;

        if(this.loggedInUser!==null)
        {
          localStorage.setItem('loggedInUser', this.loggedInUser);  
        }else
        {
          console.log("Bład w dodaniu do localStorage")
        }
        

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
    localStorage.removeItem('loggedInUser');
  }
  myAccount() {
    if (this.loggedInUser) {
      this.router.navigate(['/user', this.loggedInUser, 'details']);
    }
  }
  

}
