import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { Role } from '../enums/role.enum';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-create-user-component',
  templateUrl: './create-user-component.component.html',
  styleUrls: ['./create-user-component.component.css']
})
export class CreateUserComponentComponent implements OnInit {
userForm! : FormGroup
roles = Object.values(Role)

constructor(
  private formBuilder: FormBuilder,
    private  userService : UserService,
    private snackBar: MatSnackBar,
){}

ngOnInit() {
  this.userForm = this.formBuilder.group({
    login: ['', Validators.required],
    passwd: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    role: ['', Validators.required]
  });
}

createUser(){
  if(this.userForm.invalid)
  {
    return console.log("invalid");
  }

  const user : User = {
    ID:Date.now().toString(),
    login: this.userForm.value.login,
    passwd: this.userForm.value.passwd,
    name: this.userForm.value.name,
    surname: this.userForm.value.surname,
    role: this.userForm.value.role
  }

  this.userService.createUsers(user).subscribe(
    ()=>{
      console.log(user)
      this.snackBar.open('Funkcjonalność została utworzona', 'OK', {
        duration: 2000
      });
      this.userForm.reset();
    },
    error => {
      this.snackBar.open(
        'Wystąpił błąd podczas tworzenia funkcjonalności',
        'OK',
        {
          duration: 2000
        }
      );
      console.log(error)
    }
  )
}
}
