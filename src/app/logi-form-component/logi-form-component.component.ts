
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-logi-form-component',
  templateUrl: './logi-form-component.component.html',
  styleUrls: ['./logi-form-component.component.css']
})
export class LogiFormComponentComponent implements OnInit {
  userLogin! : string
  userPasswd! :string
  userToCheckCredential! : User
  users : User[] = []
  showH1: boolean = false;

  constructor(private userService:UserService,
    public dialogRef: MatDialogRef<LogiFormComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  { 
    this.userService.getUsers().subscribe((user:User[])=>{
      this.users = user
    })
  }

 
  ngOnInit(): void {
   
    console.log(this.users)
  }
  findUser(){
    const user = this.users.find((user:User)=> user.login == this.userLogin)

    if(user !== undefined)
    {
      this.userToCheckCredential = user
    }else{
      console.log("Erro login user")
    
    }
    
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  login(): void {
    
    
    this.userLogin = this.data.username
    this.userPasswd = this.data.password
    this.findUser()

    if(this.userToCheckCredential && this.userToCheckCredential.login===this.userLogin && this.userToCheckCredential.passwd === this.userPasswd)
    {
      this.dialogRef.close({ success: true,username: this.userToCheckCredential.login,password: this.userToCheckCredential.passwd  });
    }else{
      this.showH1 = true
      this.dialogRef.close({ success: false });
    }
    
  }
 
}
