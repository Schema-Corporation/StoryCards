import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { APIMiddleware } from "../APIMiddleware";
import { apiUrls } from "../../../common/constants";

const AUTH = apiUrls.AUTH;
const VALIDATE_ROLE = apiUrls.VALIDATE_ROLE;

@Injectable({
  providedIn: "root",
})
export class LoginService {
  headers = new Headers();
  constructor(
    public http: HttpClient,
    public apiMiddleware: APIMiddleware
  ) {}

  loginUser(token: string): Observable<any> {
    return this.apiMiddleware.doAuthenticate(AUTH, token);
  }

  validateRole(token: string): Observable<any> {
    return this.apiMiddleware.validateRole(VALIDATE_ROLE, token);
  }
}
