import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../../APIMiddleware';

const PUT_GUEST_WAITING_ROOM = apiUrls.PUT_GUEST_WAITING_ROOM;
const VALIDATE_GUEST_WAITING_ROOM= apiUrls.VALIDATE_GUEST_WAITING_ROOM;
const WS_WAITING_ROOM_URL = apiUrls.WS_WAITING_ROOM_URL;

@Injectable({
  providedIn: 'root'
})
export class RolePlayingGuestService {

  webSocket: WebSocket;

  public isGameStartedChange: Subject<boolean> = new Subject<boolean>();
  public gameId: any;

  public openWaitingRoomWebSocket(roomId, token) {
    this.webSocket = new WebSocket(WS_WAITING_ROOM_URL + roomId);

    this.webSocket.onopen = (event) => {
      console.log('open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('event: ', event);
      const eventData = JSON.parse(event.data);
      switch (eventData.operation) {
        case 'start-game': this.gameId = eventData.gameId; this.isGameStartedChange.next(true); break;
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

  enterWaitingRoom(token): Observable<any> {
    return this.apiMiddleware.enterWaitingRoom(`${PUT_GUEST_WAITING_ROOM}`, { status: 2 }, token);
  }

  leaveWaitingRoom(token): Observable<any> {
    return this.apiMiddleware.leaveWaitingRoom(`${PUT_GUEST_WAITING_ROOM}`, { status: 1 }, token);
  }

  validateWaitingRoom(token): Observable<any> {
    return this.apiMiddleware.validateWaitingRoom(`${VALIDATE_GUEST_WAITING_ROOM}`, token);
  }

}
