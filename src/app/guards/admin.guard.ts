import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
    loggedInUser!: string
    isAdmin: boolean = false
    userOptions: User[] =[]
  constructor(private router: Router,private userService:UserService) 
  {
    this.userService.getUsers().subscribe((users:User[])=>{
      this.userOptions = users
  })
  }

  canActivate(): boolean {
    const loggedInUser = localStorage.getItem('loggedInUser')

    if(loggedInUser)
    {
        this.loggedInUser = loggedInUser
    }

    const foundUser = this.userOptions.find(u=>u.login === this.loggedInUser)

   if(foundUser?.role==='Admin')
    {
        this.isAdmin=true
    }
    
    
    if (this.isAdmin) {
      return true; // Pozwól na dostęp do komponentu
    } else {
      // Wyświetl okno dialogowe i przekieruj na inną ścieżkę (np. na stronę logowania)
      alert('Brak uprawnień administratora!');
      this.router.navigate(['/projects/list']);
      return false;
    }
  }
}
