import { Project } from "./project.interface";
import { WorkStatus } from "../enums/workStatus.enum";
import { User } from "./user.interface";


export interface Functionality {
  ID:string;
    name: string;
    description: string;
    priority : string;
    project: Project; // Projekt P1
    owner : User;
    status : WorkStatus;
    addedDate: Date;
    startDate?: Date; //Najwcześniejsza Data 
    endDate?: Date;
    timeSpent?: number // Current Date - StartDate
    //przewidywany czas trwania - suma estimatedTime z task

  }