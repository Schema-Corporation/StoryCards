import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/common/constants';
import { Guest } from 'src/common/types/guest';
import { APIMiddleware } from '../APIMiddleware';

const WS_GUESTS_URL = apiUrls.WS_GET_GUEST_FROM_ROOM;
const GET_GUEST_FROM_ROOM = apiUrls.GET_GUEST_FROM_ROOM;
const DELETE_GUEST_FROM_ROOM = apiUrls.DELETE_GUEST_FROM_ROOM;
const REMOVE_GUEST_FROM_ROOM = apiUrls.REMOVE_GUEST_FROM_ROOM;

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  webSocket: WebSocket;
  public guests: Guest[] = []

  constructor(public apiMiddleware: APIMiddleware) { }

  public openGuestListWebSocket(roomId, token) {
    this.webSocket = new WebSocket(WS_GUESTS_URL + roomId);

    this.guests = []; // reset guests list
    this.getGuests(roomId, token);

    this.webSocket.onopen = (event) => {
      console.log('open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('event: ', event);
      const eventData = JSON.parse(event.data);
      switch (eventData.operation) {
        case 'add-guest': this.guests.push(eventData.guest); break;
        case 'remove-guest': this.guests = this.guests.filter(g => g.id != eventData.guestId); break;
        case 'leave-waiting-room': this.updateGuestInList(this.guests, eventData.guestId, 1); break;
        case 'enter-waiting-room': this.updateGuestInList(this.guests, eventData.guestId, 2); break;
        default: break;
      }
    };

    this.webSocket.onclose = (event) => {
      console.log('close: ', event);
      this.guests = [];
    };
    
  }

  public closeWebSockets() {
    this.webSocket.close();
  }

  public updateGuestInList(guestList, guestId, status) {
    for (var i=0;i<guestList.length;i++) {
      if (guestList[i].id == guestId) {
        guestList[i].status = status;
        break;
      }
   }
  }

  public getGuests(roomId, token) {
    return this.apiMiddleware.getGuestsByRoomId(`${GET_GUEST_FROM_ROOM}${roomId}`, token)
      .subscribe(data => {
        console.log('data: ', data);
        if (data.length > 0) {
          data.forEach(element => {
            const guest = element as Guest;
            this.guests.push(guest);
          });
        }
    });
  }

  public leaveRoom(token): Observable<any> {
    return this.apiMiddleware.leaveRoom(DELETE_GUEST_FROM_ROOM, token);
  }

  public removeGuest(guestId, roomId, token): Observable<any> {
    return this.apiMiddleware.removeGuest(`${REMOVE_GUEST_FROM_ROOM}${guestId}/${roomId}`, token);
  }
}
