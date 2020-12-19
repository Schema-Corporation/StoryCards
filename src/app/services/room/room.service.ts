import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from "../../../common/constants";
import { APIMiddleware } from '../APIMiddleware';

const GET_ROOM = apiUrls.GET_ROOM;
const GET_ROOM_ID = apiUrls.GET_ROOM_ID;
const POST_ROOM = apiUrls.POST_ROOM
const DELETE_ROOM = apiUrls.DELETE_ROOM;


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(public http: HttpClient,
    public apiMiddleware: APIMiddleware) { }

  getRoomFromUser(token): Observable<any> {
    return this.apiMiddleware.getRoomFromUser(GET_ROOM, token);
  }

  getRoomById(id, token): Observable<any> {
    return this.apiMiddleware.getRoomByRoomId(`${GET_ROOM_ID}${id}`, token);
  }

  removeRoom(id, token): Observable<any> {
    return this.apiMiddleware.removeRoom(`${DELETE_ROOM}${id}`, token);
  }

  createRoom(body, token): Observable<any> {
    return this.apiMiddleware.createRoom(POST_ROOM, body, token);
  }
}
