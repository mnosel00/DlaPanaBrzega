import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  constructor(private router: Router,){}

  login()
  {
    console.log("btn clicked")
  }
  register()
  {
    this.router.navigate(['/create-user'])
  }
  logout()
  {
    localStorage.removeItem('currentUser');

  }

}
