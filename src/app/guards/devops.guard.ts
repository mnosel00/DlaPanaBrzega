import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';

@Injectable()
export class DevopsGuard implements CanActivate {
    loggedInUser!: string
    isDevops: boolean = false
    userOptions: User[] =[]
  constructor(
    private router: Router,
    private userService:UserService
    ) 
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

    if(foundUser?.role==='Devops')
    {
        this.isDevops=true
    }
    
    
    if (this.isDevops) {
      return true; // Pozwól na dostęp do komponentu
    } else {
      // Wyświetl okno dialogowe i przekieruj na inną ścieżkę (np. na stronę logowania)
      alert('Brak uprawnień Devopsa!');
      this.router.navigate(['/projects/list']);
      return false;
    }
  }
}
