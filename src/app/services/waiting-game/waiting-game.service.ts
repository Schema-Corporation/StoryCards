import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { apiUrls } from 'src/common/constants';

const WS_WAITING_GAME_URL = apiUrls.WS_WAITING_GAME_URL;

@Injectable({
  providedIn: 'root'
})
export class WaitingGameService {

  webSocket: WebSocket;

  public isGameStartedChange: Subject<boolean> = new Subject<boolean>();
  public gameId: any;

  public openWaitingGameWebSocket(gameId, token) {
    this.webSocket = new WebSocket(WS_WAITING_GAME_URL + gameId);

    this.webSocket.onopen = (event) => {
      console.log('open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('event: ', event);
      const eventData = JSON.parse(event.data);
      switch (eventData.operation) {
        case 'go-start': this.gameId = eventData.gameId; this.isGameStartedChange.next(true); break;
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

  constructor() { }
}
