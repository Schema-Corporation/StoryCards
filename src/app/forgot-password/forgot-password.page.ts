import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ForgotPasswordService } from '../services/forgot-password/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public step: number = 1;
  public username;
  public mailOTP;
  public showCodeField: boolean = false;
  public showPasswordsField: boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public disableSendCodeButton: boolean = false;
  public userPassword: string = "";
  public getCode = "Obtener código"

  EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  constructor(public formBuilder: FormBuilder,
    public _forgotPasswordService: ForgotPasswordService,
    public navCtrl: NavController,
    public alertCtrl: AlertController) { }

  forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.EMAILPATTERN)]],
    emailOTP: [''],
    password: ['',[Validators.required]],
    confirmPassword: ['',[Validators.required]],
  }, {validator: this.matchingPasswords('password', 'confirmPassword')});

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

  get email() {
    return this.forgotPasswordForm.get("email");
  }

  get emailOTP() {
    return this.forgotPasswordForm.get("email");
  }

  get password() {
    return this.forgotPasswordForm.get("password");
  }

  get confirmPassword() {
    return this.forgotPasswordForm.get("confirmPassword");
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

  public errorMessages = {
    email: [
      { type: 'required', message: '*Ingrese su correo' },
      { type: 'pattern', message: '*El correo ingresado no es válido' }
    ],
    password: [
      { type: 'required', message: '* Debe ingresar una constraseña' }
    ],
    confirmPassword: [
      { type: 'required', message: '* Debe confirmar su contraseña' },
      { type: 'pattern', message: '* Las contraseñas no coinciden' }
    ],
  };

  ngOnInit() {
    this.step = 1;
  }

  resetPassword() {
    var body = { email: this.username, password: this.userPassword }
    this._forgotPasswordService.resetPassword(body).subscribe(reset => {
      var message = "Su cambio de contraseña se ha realizado con éxito. Por favor, intente ingresar a la aplicación"
      this.showConfirmationChangePasswordAlert(message);
    }, error => {
      var message = "¡Lo sentimos! Ha ocurrido un error en el sistema"
      this.showAlert(message)
    })
  }

  validateOTP() {
    var body = { email: this.username, otp: this.mailOTP }
    this._forgotPasswordService.validateOTP(body).subscribe(isValidOTP => {
      if (isValidOTP) {
        this.showPasswordsField = true;
      } else {
        var message = "¡Lo sentimos! El código no coincide. Por favor, inténtelo nuevamente"
        this.showAlert(message)
      }
    }, error => {
      var message = "¡Lo sentimos! El código no coincide. Por favor, inténtelo nuevamente"
      this.showAlert(message)
    });
  }

  async refreshSendCodeButton() {
    for (var i = 10; i > 0; i--) {
      this.getCode = i.toString();
      await this.sleep(1000);
    }
    this.disableSendCodeButton = false;
    this.getCode = "Obtener código";
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  sendCode() {
    this.disableSendCodeButton = true;
    var body = { email: this.username }
    this._forgotPasswordService.validateEmail(body).subscribe(userExists => {
      this._forgotPasswordService.sendCode(body).subscribe(response => {
        this.refreshSendCodeButton();
        this.showCodeField = true;
      }, error => {
        this.disableSendCodeButton = false;
        var message = "¡Lo sentimos! Ha ocurrido un error en el sistema"
        this.showAlert(message)
      });
    }, error => {
      this.disableSendCodeButton = false;
      var message = "No existe un usuario con el correo electrónico indicado"
      this.showAlert(message)
    });
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

  async showConfirmationChangePasswordAlert(message) {
    var alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¡Cambio de contraseña realizado!',
      message: message,
      buttons: [
        {
          text:'OK',
          handler: () => {
            this.navCtrl.navigateForward('login');
          }
        }
      ]
    });

    await alert.present();
  }

}
