import { Functionality } from "./functionality.interface";
import { WorkStatus } from "../enums/workStatus.enum";
import { User } from "./user.interface";

export interface Task {
  ID:string;
    name: string;
    description: string;
    priority: string;
    functionality: Functionality;
    estimatedTime: number;
    state: WorkStatus;
    addedDate: Date;
    startDate?: Date;
    endDate?: Date;
    assignedUser?: User;
  }