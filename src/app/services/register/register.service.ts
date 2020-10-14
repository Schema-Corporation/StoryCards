import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { APIMiddleware } from "../APIMiddleware";
import { apiUrls } from "../../../common/constants";

const VALIDATE_CODE_URL = apiUrls.VALIDATE_CODE;
const REGISTER_URL = apiUrls.REGISTER;

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  headers = new Headers();
  constructor(
    public http: HttpClient,
    public apiMiddleware: APIMiddleware
  ) {}

  validateCode(code: string): Observable<any> {
    return this.apiMiddleware.doValidateCode(`${VALIDATE_CODE_URL}${code}`);
  }

  registerUser(user): Observable<any> {
      return this.apiMiddleware.doRegister(REGISTER_URL, user);
  }
}