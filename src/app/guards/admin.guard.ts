import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {
    loggedInUser!: string
    isAdmin: boolean = false
  constructor(private router: Router) {}

  canActivate(): boolean {
    const loggedInUser = localStorage.getItem('loggedInUser')

    if(loggedInUser)
    {
        this.loggedInUser = loggedInUser
    }

    if(this.loggedInUser==='admin')
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
