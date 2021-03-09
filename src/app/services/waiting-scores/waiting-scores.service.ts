import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { apiUrls } from 'src/common/constants';

const WS_WAITING_SCORES_URL = apiUrls.WS_WAITING_SCORES_URL;

@Injectable({
  providedIn: 'root'
})
export class WaitingScoresService {

  webSocket: WebSocket;

  public isGameFinishedChange: Subject<boolean> = new Subject<boolean>();
  public gameId: any;

  public openWaitingScoresWebSocket(gameId, token) {
    this.webSocket = new WebSocket(WS_WAITING_SCORES_URL + gameId);

    this.webSocket.onopen = (event) => {
      console.log('open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('event: ', event);
      const eventData = JSON.parse(event.data);
      switch (eventData.operation) {
        case 'go-finish': this.gameId = eventData.gameId; this.isGameFinishedChange.next(true); break;
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
