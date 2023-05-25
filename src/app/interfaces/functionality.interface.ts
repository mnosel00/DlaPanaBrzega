import { Project } from "./project.interface";
import { WorkStatus } from "../enums/workStatus.enum";
import { User } from "./user.interface";


export interface Functionality {
    name: string;
    description: string;
    priority : string;
    project: Project;
    owner : User;
    status : WorkStatus;

  }