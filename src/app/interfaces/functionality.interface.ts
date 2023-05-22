import { Project } from "./project.interface";
import { WorkStatus } from "../enums/workStatus.enum";


export interface Functionality {
    name: string;
    description: string;
    priority : string;
    project: Project;
    owner : string;
    status : WorkStatus;

  }