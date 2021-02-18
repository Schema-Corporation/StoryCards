import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/common/constants';
import { APIMiddleware } from '../../APIMiddleware';

const PUT_GUEST_WAITING_ROOM = apiUrls.PUT_GUEST_WAITING_ROOM;

@Injectable({
  providedIn: 'root'
})
export class RolePlayingGuestService {

  constructor(public apiMiddleware: APIMiddleware) { }

  enterWaitingRoom(token): Observable<any> {
    return this.apiMiddleware.enterWaitingRoom(`${PUT_GUEST_WAITING_ROOM}`, { status: 2 }, token);
  }

  leaveWaitingRoom(token): Observable<any> {
    return this.apiMiddleware.leaveWaitingRoom(`${PUT_GUEST_WAITING_ROOM}`, { status: 1 }, token);
  }

}
