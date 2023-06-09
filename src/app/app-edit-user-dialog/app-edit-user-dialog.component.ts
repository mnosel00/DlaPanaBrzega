import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-app-edit-user-dialog',
  templateUrl: './app-edit-user-dialog.component.html',
  styleUrls: ['./app-edit-user-dialog.component.css']
})
export class AppEditUserDialogComponent {
  value: string;

  constructor(private dialogRef: MatDialogRef<AppEditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { user: User, property: keyof User }) {
    this.value = data.user[data.property];
  }

  save() {
    this.dialogRef.close(this.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
