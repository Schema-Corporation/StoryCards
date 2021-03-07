import { Injectable } from '@angular/core';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../APIMiddleware';

const WS_HOST_CHALLENGES_APPROVAL_URL = apiUrls.WS_HOST_CHALLENGES_APPROVAL_URL;
const GUEST_CHALLENGES_APPROVAL_URL = apiUrls.GUEST_CHALLENGES_APPROVAL_URL;
const PUT_CHALLENGES_APPROVAL = apiUrls.PUT_CHALLENGES_APPROVAL;
const DELETE_CHALLENGES_APPROVAL = apiUrls.DELETE_CHALLENGES_APPROVAL;

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  webSocket: WebSocket;

  public challengesList: any = [];

  constructor(public apiMiddleware: APIMiddleware) { }

  public openChallengesListWebSocket(gameId, token) {
    this.webSocket = new WebSocket(WS_HOST_CHALLENGES_APPROVAL_URL + gameId);

    this.challengesList = []; // reset guests list
    this.getChallengesApproval(gameId, token);

    this.webSocket.onopen = (event) => {
      console.log('open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('event: ', event);
      const eventData = JSON.parse(event.data);
      switch (eventData.operation) {
        case 'challenge-received': this.challengesList.push(eventData.challenge); break;
        default: break;
      }
    };

    this.webSocket.onclose = (event) => {
      console.log('close: ', event);
      this.challengesList = [];
    };
    
  }

  getChallengesApproval(gameId, token) {
    return this.apiMiddleware.getChallengesApproval(`${GUEST_CHALLENGES_APPROVAL_URL}${gameId}`, token)
    .subscribe(data => {
      console.log('data: ', data);
      if (data.length > 0) {
        data.forEach(element => {
          const challenge = element;
          this.challengesList.push(challenge);
        });
      }
    });
  }

  acceptChallenge(gameId, body, token) {
    return this.apiMiddleware.acceptChallenge(`${PUT_CHALLENGES_APPROVAL}${gameId}`, body, token)
  }
}
