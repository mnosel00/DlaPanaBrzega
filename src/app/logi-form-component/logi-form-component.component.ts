import { Component } from '@angular/core';

@Component({
  selector: 'app-logi-form-component',
  templateUrl: './logi-form-component.component.html',
  styleUrls: ['./logi-form-component.component.css']
})
export class LogiFormComponentComponent {
  username!: string;
  password!: string;
  showLogin: boolean = false;

  login(): void {
 
    if (this.username === 'admin' && this.password === 'admin') {
      localStorage.setItem('currentUser', this.username);
      this.showLogin = false;
    } else {
      alert('Błędne dane logowania!');
    }
  }

}
