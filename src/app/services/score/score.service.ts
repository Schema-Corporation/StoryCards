import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../APIMiddleware';

const GET_SCORES = apiUrls.GET_SCORES;
const WS_FINISH_GAME = apiUrls.WS_FINISH_GAME;
const POST_END_GAME = apiUrls.POST_END_GAME;

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  webSocket: WebSocket;
  public isGameEndedChange: Subject<boolean> = new Subject<boolean>();
  public gameId: any;

  public openFinishGameWebSocket(gameId, token) {
    this.webSocket = new WebSocket(WS_FINISH_GAME + gameId);

    this.webSocket.onopen = (event) => {
      console.log('open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('event: ', event);
      const eventData = JSON.parse(event.data);
      switch (eventData.operation) {
        case 'end-game': this.gameId = eventData.gameId; this.isGameEndedChange.next(true); break;
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

  constructor(public http: HttpClient,
    public apiMiddleware: APIMiddleware) { }

  getScores(gameId, token) {
    return this.apiMiddleware.getScores(`${GET_SCORES}${gameId}`, token);
  }

  endGame(gameId, token) {
    return this.apiMiddleware.endGame(`${POST_END_GAME}${gameId}`, token);
  }
}
