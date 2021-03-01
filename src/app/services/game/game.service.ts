import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../APIMiddleware';

const POST_CHALLENGE_APPROVAL = apiUrls.POST_CHALLENGE_APPROVAL;
const WS_CHALLENGE_APPROVAL_URL = apiUrls.WS_CHALLENGE_APPROVAL_URL;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  webSocket: WebSocket;

  public response = "";

  public openChallengeApprovalWebSocket(guestId, token) {
    this.webSocket = new WebSocket(WS_CHALLENGE_APPROVAL_URL + guestId);

    this.webSocket.onopen = (event) => {
      console.log('open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('event: ', event);
      const eventData = JSON.parse(event.data);
      switch (eventData.operation) {
        case 'rejected': this.response = 'rejected'; break;
        case 'approved': this.response = 'approved'; break;
        default: break;
      }
    };

    this.webSocket.onclose = (event) => {
      console.log('close: ', event);
    };
    
  }

  constructor(public apiMiddleware: APIMiddleware) { }

  sendChallengeForApproval(body, token): Observable<any> {
    return this.apiMiddleware.sendChallengeForApproval(`${POST_CHALLENGE_APPROVAL}`, body, token);
  }
}
