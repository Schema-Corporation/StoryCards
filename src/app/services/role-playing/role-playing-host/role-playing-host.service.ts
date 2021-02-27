import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../../APIMiddleware';

const POST_GAME = apiUrls.POST_GAME;

@Injectable({
  providedIn: 'root'
})
export class RolePlayingHostService {

  constructor(public apiMiddleware: APIMiddleware) { }

  createGame(token, body): Observable<any> {
    return this.apiMiddleware.createGame(POST_GAME, body, token);
  }
}
