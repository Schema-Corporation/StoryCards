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

  validateRole(url: string, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Basic " + token
      }),
    };
    return this.http.get(url, httpOptions);
  }

  getCanvasFromUser(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.get(url, httpOptions);
  }

  getCanvasById(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.get(url, httpOptions);
  }

  editCanvas(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.put(url, body, httpOptions);
  }

  createCanvas(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  removeCanvas(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.delete(url, httpOptions);
  }

  getRoomFromUser(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.get(url, httpOptions);
  }

  getRoomByRoomId(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.get(url, httpOptions);
  }

  createRoom(url, body, token): Observable <any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  removeRoom(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.delete(url, httpOptions);
  }

  activateRoom(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.put(url, body, httpOptions);
  }

  deactivateRoom(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.put(url, body, httpOptions);
  }

  doValidateCode(url: string): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'X-IP': this.ipAddress
      })
    };
    return this.http.post(url, null, httpOptions);
  }

  doRegister(url: string, user: any): Observable<any> {
    return this.http.post(url, user);
  }

  validateRoomCode(url, body): Observable<any> {
    return this.http.post(url, body);
  }

  addGuest(url, body): Observable<any> {
    return this.http.post(url, body);
  }

  getGuestsByRoomId(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.get(url, httpOptions);
  }

  enterWaitingRoom(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.put(url, body, httpOptions);
  }

  leaveWaitingRoom(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.put(url, body, httpOptions);
  }

  validateWaitingRoom(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.post(url, null, httpOptions);
  }

  createGame(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  leaveRoom(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.delete(url, httpOptions);
  }

  removeGuest(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.delete(url, httpOptions);
  }

  sendChallengeForApproval(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  getChallengesApproval(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.get(url, httpOptions);
  }

  getAnswersFromGame(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.get(url, httpOptions);
  }

  postAnswer(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  acceptChallenge(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.put(url, body, httpOptions);
  }

  rejectChallenge(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  goToStartGame(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.post(url, null, httpOptions);
  }

  finishGame(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.post(url, null, httpOptions);
  }

  giveExtraPoints(url, body, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.put(url, body, httpOptions);
  }

  getScores(url, token) : Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.get(url, httpOptions);
  }

  endGame(url, token): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };
    return this.http.post(url, httpOptions);
  }
}
