import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class APIMiddleware {
  constructor(public http: HttpClient) {}
  doAuthenticate(url: string, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Basic " + token
      }),
    };
    return this.http.post(url, null, httpOptions);
  }

  doValidateCode(url: string): Observable<any> {
    return this.http.post(url, null);
  }

  doRegister(url: string, user: any): Observable<any> {
    return this.http.post(url, user);
  }
}
