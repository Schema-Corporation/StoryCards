import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public step: number = 1;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  constructor(private formBuilder: FormBuilder) { }
  
  EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  PHONEPATTERN = 	/^([9])(\d{4})(-?|\040?)(\d{4})( ?|\040?)(\d{1,4}?|\040?)$/;

  validationForm = this.formBuilder.group({
    bookCode: ['', [Validators.required]]
    //falta agregar validaciones para el codigo del libro
  })

  registrationForm = this.formBuilder.group({
    
    username: ['',[Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
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
  addStep(){
    this.step++;
  }
}
