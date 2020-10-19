import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IpServiceService } from './ip/ip-service.service';


@Injectable()
export class APIMiddleware {

  public ipAddress:string;  

  constructor(public http: HttpClient, 
    private ip:IpServiceService) {
      ip.getIPAddress().subscribe((res:any)=>{  
        this.ipAddress=res.ip;  
      });  
    }
  doAuthenticate(url: string, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Basic " + token
      }),
    };
    return this.http.post(url, null, httpOptions);
  }

  doValidateCode(url: string): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'X-IP': this.ipAddress
      }),
    };
    return this.http.post(url, null, httpOptions);
  }

  doRegister(url: string, user: any): Observable<any> {
    return this.http.post(url, user);
  }
}
