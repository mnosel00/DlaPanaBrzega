import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../interfaces/user.interface';
import { Task } from '../interfaces/task.interface';
import { WorkStatus } from '../enums/workStatus.enum';

@Component({
  selector: 'app-app-edit-task-dialog',
  templateUrl: './app-edit-task-dialog.component.html',
  styleUrls: ['./app-edit-task-dialog.component.css']
})
export class AppEditTaskDialogComponent {
  value: WorkStatus;
  workStatusOptions = Object.values(WorkStatus);

  constructor(private dialogRef: MatDialogRef<AppEditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task, property: keyof Task }) {
    this.value = data.task.state;
}

  save() {
    this.dialogRef.close(this.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
