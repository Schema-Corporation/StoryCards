import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public showPassword: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  getPasswordType() {
    return this.showPassword ? 'text' : 'password'
  }

  toggleTextPassword() {
    this.showPassword = this.showPassword == true ? false : true;
  }

}
