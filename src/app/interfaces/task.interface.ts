import { Functionality } from "./functionality.interface";
import { WorkStatus } from "../enums/workStatus.enum";

export interface Task {
    name: string;
    description: string;
    priority: string;
    functionality: Functionality;
    estimatedTime: number;
    state: WorkStatus;
    addedDate: Date;
    startDate?: Date;
    endDate?: Date;
    assignedUser?: string;
  }