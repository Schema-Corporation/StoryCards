import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../APIMiddleware';

const POST_CHALLENGE_APPROVAL = apiUrls.POST_CHALLENGE_APPROVAL;
const WS_CHALLENGE_APPROVAL_URL = apiUrls.WS_CHALLENGE_APPROVAL_URL;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  webSocket: WebSocket;

  public response: Subject<string> = new Subject<string>();

  public openChallengeApprovalWebSocket(guestId, token) {
    this.webSocket = new WebSocket(WS_CHALLENGE_APPROVAL_URL + guestId);

    this.webSocket.onopen = (event) => {
      console.log('open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('event: ', event);
      const eventData = JSON.parse(event.data);
      switch (eventData.operation) {
        case 'challenge-rejected': this.response.next('rejected'); break;
        case 'challenge-approved': this.response.next('approved'); break;
        default: break;
      }
    };

    this.webSocket.onclose = (event) => {
      console.log('close: ', event);
    };
    
  }

  public closeWebSockets() {
    this.webSocket.close();
  }

  constructor(public apiMiddleware: APIMiddleware) { }

  sendChallengeForApproval(gameId, body, token): Observable<any> {
    return this.apiMiddleware.sendChallengeForApproval(`${POST_CHALLENGE_APPROVAL}${gameId}`, body, token);
  }
}
