import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { LoginService } from '../services/auth/login.service';
import { RegisterService } from '../services/register/register.service';
import { Countries } from './countries';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public step: number = 1;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;

  public book: string = "";

  public bookID: string = "";

  public name: string = "";
  public lastname: string = "";
  public country: string = "";
  public countryCode: string = "";
  public phoneNumber: string = "";
  public emailAddress: string = "";
  public userPassword: string = "";

  public countries: any = [];

  constructor(private formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _loginService: LoginService,
    private dbService: NgxIndexedDBService,
    private navCtrl: NavController,
    private alertCtrl: AlertController) { }
  
  EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  PHONEPATTERN = 	/^([9])(\d{4})(-?|\040?)(\d{4})( ?|\040?)(\d{1,4}?|\040?)$/;
  NAMEPATTERN = /[A-Za-zÀ-ȕ,\s]/;

  validationForm = this.formBuilder.group({
    bookCode: ['', [Validators.required]]
  })

  registrationForm = this.formBuilder.group({
    
    username: ['',[Validators.required,  Validators.pattern(this.NAMEPATTERN)]],
    ulastname: ['', [Validators.required,  Validators.pattern(this.NAMEPATTERN)]],
    location: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.pattern(this.EMAILPATTERN)]],
    phone: ['',[Validators.required, Validators.pattern(this.PHONEPATTERN)]],
    password: ['',[Validators.required]],
    confirmPassword: ['',[Validators.required]]

  }, {validator: this.matchingPasswords('password', 'confirmPassword')});


  ngOnInit() {
    this.countries = Countries.countryItems;
  }

  get username() {
    return this.registrationForm.get("username");
  }
  get ulastname() {
    return this.registrationForm.get("ulastname");
  }
  get location() {
    return this.registrationForm.get("location");
  }
  get phone() {
    return this.registrationForm.get("phone");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
  }
  get confirmPassword() {
    return this.registrationForm.get("confirmPassword");
  }
  get bookCode() {
    return this.validationForm.get("bookCode");
  }
  public errorMessages = {
    username: [
      { type: 'required', message: '* Debe ingresar un nombre' },
      { type: 'pattern', message: '* El nombre no debe contener caracteres especiales' }
    ],
    ulastname: [
      { type: 'required', message: '* Debe ingresar un apellido' },
      { type: 'pattern', message: '* Los apellidos no deben contener caracteres especiales' }
    ],
    location: [
      { type: 'required', message: '* Debe ingresar su país de procedencia' },
    ],
    email: [
      { type: 'required', message: '* Debe ingresar un correo' },
      { type: 'pattern', message: '* Ingrese un correo válido' }
    ],
    phone: [
      { type: 'required', message: '* Debe ingresar un número telefónico' },
      { type: 'pattern', message: '* Debe ingresar un número de teléfono válido' }
    ],
    password: [
      { type: 'required', message: '* Debe ingresar una constraseña' }
    ],
    confirmPassword: [
      { type: 'required', message: '* Debe confirmar su contraseña' },
      { type: 'pattern', message: '* Las contraseñas no coinciden' }
    ],
    bookCode: [
      { type: 'required', message: '* Debe ingresar el código del libro' }
    ],
  };

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
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

  selectCountry(ev) {
    this.country = ev.detail.value.nombre;
    this.countryCode = "+" + ev.detail.value.phone_code;
  }

  async showAlert(message) {
    var alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¡Lo sentimos!',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  getUserToken() {
    var user = btoa(this.emailAddress + ":" + this.userPassword);
    return user;
  }

  login() {
    var authorization = this.getUserToken()
    this._loginService.loginUser(authorization).subscribe(token => {
      this.dbService.add('variables', { name: 'token', value: token }).subscribe(
        () => {
          this.dbService.getByIndex('variables', 'name', 'token').subscribe(
            token => {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                    first: true
                }
              }
              this.navCtrl.navigateForward(['menu/main'], navigationExtras);
            },
            error => {
                console.log(error);
            });
            // Do something after the value was added
  
        },
        error => {
            console.log("error: ", error);
        }
      );
    });
  }


  register() {
    let user = {
      username: this.emailAddress,
      password: this.userPassword,
      email: this.emailAddress,
      phone: this.phoneNumber,
      firstName: this.name,
      lastName: this.lastname,
      countryName: this.country,
      countryCode: this.countryCode,
      bookCodeId: this.bookID
    };

    this._registerService.registerUser(user).subscribe(user => {
      this.login();
    }, error => {
      var message = "El usuario ya se encuentra registrado"
      this.showAlert(message)
      console.log('error: ', error);
    });
  }

  verify() {
    this._registerService.validateCode(this.book).subscribe(res => {
     let book = res.response;
      if (book.status == 0 && book.enabled == 1) {
        this.bookID = book.id;
        this.step++;
      } else {
        var message = "El código ingresado ya ha sido utilizado"
        this.showAlert(message)
      }
    }, error => {
      var message = "Error en el sistema";
      if (error.status == 500) {
        message = "El código ingresado no existe"
      } else {
        if (error.status == 403) {
          message = "Ha ingresado muchas veces un código erróneo. Por favor, inténtelo más tarde."
        } else {
          message = "Error en el sistema"
        }
      }
      this.showAlert(message)
    });
  }
}
