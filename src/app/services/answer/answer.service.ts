import { Injectable } from '@angular/core';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../APIMiddleware';

const WS_HOST_EVALUATE_ANSWERS_URL = apiUrls.WS_HOST_EVALUATE_ANSWERS_URL;
const HOST_EVALUATE_ANSWERS_URL = apiUrls.HOST_EVALUATE_ANSWERS_URL;

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
    this.getChallengesApproval(gameId, token);

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

  getChallengesApproval(gameId, token) {
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

}
