import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { Observable, of } from "rxjs";
import { Role } from "../enums/role.enum";

@Injectable({
    providedIn:"root"
})


export class UserService {
    
    private localStorageKey = 'users';
    private users : User[] = [{
      ID: 'stasr',
      login: 'admin',
      passwd: 'admin',
      name: 'Admin',
      surname: 'nimdA',
      role: Role.Admin
    }]

    private loadUsersFromLocalStorage(): void {
        const projectsData = localStorage.getItem(this.localStorageKey);
        if (projectsData) {
          this.users = JSON.parse(projectsData);
        }
    }

    private saveUsersToLocalStorage(): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.users));
    }

    constructor() {
        this.loadUsersFromLocalStorage();
    }

    getUsers(): Observable<User[]>{
        return of(this.users);
    }

    createUsers(user:User): Observable<User>{
        this.users.push(user);
        this.saveUsersToLocalStorage();
        return of(user)
    }

    updateUser(user: User): Observable<User>{
        const userToUpdate = this.users.find(u=>u.login === user.login);
  
        if(userToUpdate)
        {
          userToUpdate.login = user.login
          userToUpdate.passwd = user.passwd
          userToUpdate.name = user.name
          userToUpdate.surname = user.surname
          userToUpdate.role = user.role
          this.saveUsersToLocalStorage();
          return of(userToUpdate)
        }
        else
        {
          return of()
        }
    }

    deleteUser(userLogin: string): Observable<boolean>{
        const index = this.users.findIndex(u=>u.login === userLogin);
  
        if (index !== -1) 
        {
          this.users.splice(index, 1);
          this.saveUsersToLocalStorage();
          return of(true);
        } 
        else 
        {
          return of(false);
        }
    }
    
}