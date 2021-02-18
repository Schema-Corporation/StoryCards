import { Injectable } from '@angular/core';
import { apiUrls } from 'src/common/constants';
import { Guest } from 'src/common/types/guest';
import { APIMiddleware } from '../APIMiddleware';

const WS_GUESTS_URL = apiUrls.WS_GET_GUEST_FROM_ROOM;
const GET_GUEST_FROM_ROOM = apiUrls.GET_GUEST_FROM_ROOM;

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  webSocket: WebSocket;
  public guests: Guest[] = []

  constructor(public apiMiddleware: APIMiddleware) { }

  public openWebSocket(roomId, token) {
    this.webSocket = new WebSocket(WS_GUESTS_URL);

    this.guests = []; // reset guests list
    this.getGuests(roomId, token);

    this.webSocket.onopen = (event) => {
      console.log('open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('event: ', event);
      const guestDto = JSON.parse(event.data);
      this.guests.push(guestDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('close: ', event);
      this.guests = [];
    };
    
  }

  public closeWebSockets() {
    this.webSocket.close();
  }

  public getGuests(roomId, token) {
    return this.apiMiddleware.getGuestsByRoomId(`${GET_GUEST_FROM_ROOM}${roomId}`, token)
      .subscribe(data => {
        data.forEach(element => {
          const guest = element as Guest;
          this.guests.push(guest);
        });
    });
  }
}
