import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public showPassword: boolean = false;
  public username: string;
  public password: string;

  constructor(
    private _loginService: LoginService,
    public navCtrl: NavController,
    private dbService: NgxIndexedDBService) { }

  ngOnInit() {
    this.checkAccess();
  }

  checkAccess() {

  }

  getPasswordType() {
    return this.showPassword ? 'text' : 'password'
  }

  toggleTextPassword() {
    this.showPassword = this.showPassword == true ? false : true;
  }

  getUserToken() {
    var user = btoa(this.username + ":" + this.password);
    return user;
  }

  login() {
    var authorization = this.getUserToken()
    this._loginService.loginUser(authorization).subscribe(token => {
      this.dbService.add('variables', { name: 'token', value: token }).subscribe(
        () => {
          this.dbService.getByIndex('variables', 'name', 'token').subscribe(
            token => {
              this.navCtrl.navigateForward(['menu/main']);
            },
            error => {
                console.log(error);
            });
            // Do something after the value was added
  
        },
        error => {
            console.log("ERROR: ", error);
        }
      );
    });
  }

}
