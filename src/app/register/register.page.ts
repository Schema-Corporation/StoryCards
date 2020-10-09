import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public step: number = 1;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  getPasswordType() {
    return this.showPassword ? 'text' : 'password'
  }
  getConfirmPasswordType(){
    return this.showConfirmPassword ? 'text' : 'password'
  }
  toggleTextPassword() {
    this.showPassword = this.showPassword == true ? false : true;
  }
  toggleTextConfirmPassword(){
    this.showConfirmPassword = this.showConfirmPassword == true ? false : true;

  }
  addStep(){
    this.step++;
  }
}
