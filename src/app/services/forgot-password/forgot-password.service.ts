import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../APIMiddleware';

const VALIDATE_EMAIL = apiUrls.VALIDATE_EMAIL;
const SEND_CODE = apiUrls.SEND_CODE;
const VALIDATE_OTP = apiUrls.VALIDATE_OTP;
const RESET_PASSWORD = apiUrls.RESET_PASSWORD;

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  headers = new Headers();
  constructor(
    public http: HttpClient,
    public apiMiddleware: APIMiddleware
  ) {}
  
  validateEmail(email): Observable<any> {
    return this.apiMiddleware.doValidateEmail(VALIDATE_EMAIL, email);
  }

  sendCode(email): Observable<any> {
    return this.apiMiddleware.sendCode(SEND_CODE, email);
  }

  validateOTP(otp): Observable<any> {
    return this.apiMiddleware.validateOTP(VALIDATE_OTP, otp);
  }

  resetPassword(body): Observable<any> {
    return this.apiMiddleware.resetPassword(RESET_PASSWORD, body);
  }
}
