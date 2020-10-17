import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { LoginService } from '../services/auth/login.service';
import { RegisterService } from '../services/register/register.service';

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
  public phoneNumber: string = "";
  public emailAddress: string = "";
  public userPassword: string = "";

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
    //falta agregar validaciones para el codigo del libro
  })

  registrationForm = this.formBuilder.group({
    
    username: ['',[Validators.required, Validators.maxLength(50), Validators.pattern(this.NAMEPATTERN)]],
    email: ['',[Validators.required, Validators.pattern(this.EMAILPATTERN)]],
    phone: ['',[Validators.required, Validators.maxLength(9), Validators.pattern(this.PHONEPATTERN)]],
    password: ['',[Validators.required,Validators.minLength(9), Validators.maxLength(15)]],
    confirmPassword: ['',[Validators.required]],
    //falta agregar validaciones para la contrasenia

  }, {validator: this.matchingPasswords('password', 'confirmPassword')});


  ngOnInit() {
  }

  get username() {
    return this.registrationForm.get("username");
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
      { type: 'required', message: '*Debe ingresar un nombre' },
      { type: 'maxlength', message: '*El nombre no debe superar los 15 caracteres' },
      { type: 'pattern', message: '*No se permite caracteres especiales' }
    ],
    email: [
      { type: 'required', message: '*Debe ingresar un correo' },
      { type: 'pattern', message: '*Ingrese un correo válido' }
    ],
    phone: [
      { type: 'required', message: '*Debe ingresar un número telefónico' },
      { type: 'pattern', message: '*Ingrese un número telefónico válido' },
      { type: 'maxlength', message: '*El número telefónico debe contener como 9 caracteres' }
    ],
    password: [
      { type: 'required', message: '*Debe ingresar una constraseña' },
      { type: 'minlenght', message: '*La contraseña debe contener como mínimo 9 caracteres' },
      { type: 'maxlenght', message: '*La contraseña no debe superar los 15 caracteres' }
    ],
    confirmPassword: [
      { type: 'required', message: '*Debe confirmar su contraseña' },
      { type: 'pattern', message: '*Las contraseñas no coinciden' }

    ],
    bookCode: [
      { type: 'required', message: '*Debe ingresar el código del libro' },
      { type: 'maxlenght', message: '*El codigo no debe superar los 10 caracteres' }
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
            console.log("ERROR: ", error);
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
      fullName: this.name,
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
    this._registerService.validateCode(this.book).subscribe(book => {
      console.log('book: ', book);
      if (book.status == 0 && book.enabled == 1) {
        this.bookID = book.id;
        this.step++;
      } else {
        var message = "El código ingresado ya ha sido utilizado"
        this.showAlert(message)
      }
    }, error => {
      console.log('error: ', error);
      var message = "Error en el sistema";
      if (error.status == 422) {
        message = "El código ingresado no existe"
      } else {
        message = "Error en el sistema"
      }
      this.showAlert(message)
    });
  }
}
