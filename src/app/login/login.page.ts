import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { LoginService } from '../services/auth/login.service';
import { FormBuilder, Validators,FormGroup} from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public showPassword: boolean = false;
  public username: string;
  public password: string;
  EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  constructor(
    private _loginService: LoginService,
    public navCtrl: NavController,
    private dbService: NgxIndexedDBService,
    private formBuilder: FormBuilder) { }


  loginForm = this.formBuilder.group({
    email: ['',[Validators.required, Validators.pattern(this.EMAILPATTERN)]],
  });
  ngOnInit() {
    this.checkAccess();
  }
  get email() {
    return this.loginForm.get("email");
  }
  public errorMessages = {
    email: [
      {type: 'required', message: '*Ingrese su correo'},
      {type: 'pattern', message: '*El correo ingresado no es válido'}
    ]
  };
  checkAccess() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        if (token != null) {
          this.navCtrl.navigateForward(['menu/main']);
        }
      },
      error => {
      });
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
