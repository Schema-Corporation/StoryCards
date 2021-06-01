import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../APIMiddleware';

const POST_ANSWER = apiUrls.POST_ANSWER;
const GET_CHALLENGES = apiUrls.GET_CHALLENGES;

@Injectable({
  providedIn: 'root'
})
export class GuestTurnService {

  constructor(public apiMiddleware: APIMiddleware) { }

  postAnswer(gameId, body, token): Observable<any> {
    return this.apiMiddleware.postAnswer(`${POST_ANSWER}${gameId}`, body, token);
  }

  getChallenges(gameId, token): Observable<any> {
    return this.apiMiddleware.getChallengesApproval(`${GET_CHALLENGES}${gameId}`, token);
  }
}
