import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../APIMiddleware';

const WS_HOST_EVALUATE_ANSWERS_URL = apiUrls.WS_HOST_EVALUATE_ANSWERS_URL;
const HOST_EVALUATE_ANSWERS_URL = apiUrls.HOST_EVALUATE_ANSWERS_URL;
const GET_CHALLENGES = apiUrls.GET_CHALLENGES;
const FINISH_GAME = apiUrls.FINISH_GAME;

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  webSocket: WebSocket;

  public answersList: any = [];

  constructor(public apiMiddleware: APIMiddleware) { }

  public openAnswersListWebSocket(gameId, token) {
    this.webSocket = new WebSocket(WS_HOST_EVALUATE_ANSWERS_URL + gameId);

    this.answersList = []; // reset guests list
    this.getAnswers(gameId, token);

    this.webSocket.onopen = (event) => {
      console.log('open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('event: ', event);
      const eventData = JSON.parse(event.data);
      switch (eventData.operation) {
        case 'answer-received': this.answersList.push(eventData.answer); break;
        default: break;
      }
    };

    this.webSocket.onclose = (event) => {
      console.log('close: ', event);
      this.answersList = [];
    };
    
  }

  public closeWebSockets() {
    this.webSocket.close();
  } 

  getAnswers(gameId, token) {
    return this.apiMiddleware.getAnswersFromGame(`${HOST_EVALUATE_ANSWERS_URL}${gameId}`, token)
    .subscribe(data => {
      console.log('data: ', data);
      if (data.length > 0) {
        data.forEach(element => {
          const answer = element;
          this.answersList.push(answer);
        });
      }
    });
  }

  getChallenges(gameId, token): Observable<any> {
    return this.apiMiddleware.getChallengesApproval(`${GET_CHALLENGES}${gameId}`, token);
  }

  finishGame(gameId, token): Observable<any> {
    return this.apiMiddleware.finishGame(`${FINISH_GAME}${gameId}`, token);
  }

}
