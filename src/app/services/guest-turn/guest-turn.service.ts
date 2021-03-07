import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../APIMiddleware';

const POST_ANSWER = apiUrls.POST_ANSWER;

@Injectable({
  providedIn: 'root'
})
export class GuestTurnService {

  constructor(public apiMiddleware: APIMiddleware) { }

  postAnswer(gameId, body, token): Observable<any> {
    return this.apiMiddleware.postAnswer(`${POST_ANSWER}${gameId}`, body, token);
  }
}
