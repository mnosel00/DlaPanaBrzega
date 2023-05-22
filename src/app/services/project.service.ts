import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { Functionality } from '../interfaces/functionality.interface';
import { Task } from '../interfaces/task.interface';
import { of } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { WorkStatus } from '../enums/workStatus.enum';
import { Role } from '../enums/role.enum';


@Injectable({
    providedIn: 'root'
  })



  export class ProjectService {

    private projects: Project[] =[];
    private functionalities: Functionality[] =[];
    private tasks: Task[] =[];
    private users: User[] = [];


    constructor() {
      this.projects = [
        {
          name:"P1",
          description:"To jest projekt który powinien zaliczyć mi P1",
        },
        {
          name:"P2",
          description:"To jest projekt który powinien zaliczyć mi P2"
        }
      ];

      const projectName = "P1"
      const P1 = this.projects.find(p=>p.name===projectName);
      
      if (P1) 
      {
        this.functionalities = [
          {
            name: "Pierwsza funkcjonalność",
            description: "Opis pierwszej funkcjonalności",
            priority: "Wysokie",
            project: P1,
            owner: "Nosel",
            status: WorkStatus.Todo
          }
        ];
      } 
      else 
      {
        console.error("Nie znaleziono projektu o nazwie " + projectName);
      }

      this.users = [
        {
          login:"mnosel00",
          passwd:"zaq1@WSX",
          name:"Mateusz",
          surname:"Nosel",
          role:Role.Developer
        }
      ]

      const functionalityName = "Pierwsza funkcjonalność"
      const P1F1 = this.functionalities.find(f=>f.name === functionalityName)
     
      const userName = "mnosel00"
      const assignedUser = this.users.find(u=>u.name===userName)

      if(P1F1)
      {
        this.tasks = [
          {
            name: "1Task",
            description: "To jest pierwszy task",
            priority: "Wysokie",
            functionality: P1F1,
            estimatedTime:3,
            state:WorkStatus.Doing,
            addedDate: new Date ("2023-05-22"),
            startDate: new Date ("2023-05-23"),
            endDate: new Date ("2023-05-25"),
            assignedUser:assignedUser
          }
        ]
      }
      else
      {
        console.error("Nie znaleziono funkcjonalnosci o nazwie " + functionalityName);
      }

    
    }
  
    // PROJEKT
    getProjects(): Observable<Project[]> {
      return of(this.projects);
    }
  
    createProject(project: Project): Observable<Project> {
      this.projects.push(project);
      return of(project);
    }

    updateProject(project: Project): Observable<Project> {
      const projectToUpdate = this.projects.find(p => p.name === project.name);

      if (projectToUpdate) 
      {
        projectToUpdate.name = project.name;
        projectToUpdate.description = project.description;
        return of(projectToUpdate);
      } 
      else 
      {
        return of();
      }
    }
  
    deleteProject(projectName: string): Observable<boolean> {
      const projectToDeleteIndex = this.projects.findIndex(p => p.name === projectName);

      if (projectToDeleteIndex !== -1) 
      {
        this.projects.splice(projectToDeleteIndex, 1);
        return of(true)
      }
      else
      {
        return of(false)
      }
    }


    //FUNKCJONALNOSCI
    getFunctionalities(): Observable<Functionality[]>{
      return of(this.functionalities);
    }
    
    createFunctionality(functionality:Functionality): Observable<Functionality> {
      this.functionalities.push(functionality);
      return of(functionality)
    }

    updateFunctionality(functionality:Functionality): Observable<Functionality> {
      const functionalityToUpdate = this.functionalities.find(p=>p.name === functionality.name);

      if(functionalityToUpdate)
      {
        functionalityToUpdate.name = functionality.name
        functionalityToUpdate.description = functionality.description
        functionalityToUpdate.priority = functionality.priority
        functionalityToUpdate.project = functionality.project
        functionalityToUpdate.owner = functionality.owner
        functionalityToUpdate.status = functionality.status
        return of(functionalityToUpdate)
      }
      else
      {
        return of();
      }
    }

    deleteFunctionality(functionalityName: string): Observable<boolean> {
      const index = this.functionalities.findIndex(f => f.name === functionalityName);
  
      if (index !== -1) 
      {
        this.functionalities.splice(index, 1);
        return of(true);
      } 
      else 
      {
        return of(false);
      }
    }


    //UZYTKOWNICY
    getUsers(): Observable<User[]>{
      return of(this.users);
    }

    createUsers(user:User): Observable<User>{
      this.users.push(user);
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
        return of(true);
      } 
      else 
      {
        return of(false);
      }
    }


    //ZADANIA
    getTasks(): Observable<Task[]>{
      return of(this.tasks);
    }

    createTask(task:Task): Observable<Task>{
      this.tasks.push(task);
      return of(task)
    }

    updateTask(task: Task): Observable<Task>{
      const taskToUpdate = this.tasks.find(u=>u.name === task.name);

      if(taskToUpdate)
      {
        taskToUpdate.name = task.name
        taskToUpdate.description = task.description
        taskToUpdate.priority = task.priority
        taskToUpdate.functionality = task.functionality
        taskToUpdate.estimatedTime = task.estimatedTime
        taskToUpdate.state = task.state
        taskToUpdate.addedDate = task.addedDate
        taskToUpdate.startDate = task.startDate
        taskToUpdate.endDate = task.endDate
        taskToUpdate.assignedUser = task.assignedUser
        return of(taskToUpdate)
      }
      else
      {
        return of()
      }
    }

    deleteTask(taskName: string): Observable<boolean>{
      const index = this.tasks.findIndex(t=>t.name === taskName);

      if (index !== -1) 
      {
        this.tasks.splice(index, 1);
        return of(true);
      } 
      else 
      {
        return of(false);
      }
    }
  }
  