import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from "../../../common/constants";
import { APIMiddleware } from '../APIMiddleware';

const GET_CANVAS = apiUrls.GET_CANVAS;
const GET_CANVAS_ID = apiUrls.GET_CANVAS_ID;
const POST_CANVAS = apiUrls.POST_CANVAS;
const DELETE_CANVAS = apiUrls.DELETE_CANVAS;

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  constructor(public http: HttpClient,
    public apiMiddleware: APIMiddleware) { }

  getCanvasFromUser(token): Observable<any> {
    return this.apiMiddleware.getCanvasFromUser(GET_CANVAS, token);
  }

  createCanvas(body, token): Observable<any> {
    return this.apiMiddleware.createCanvas(POST_CANVAS, body, token);
  }

  getCanvasById(canvasId, token): Observable<any> {
    return this.apiMiddleware.getCanvasById(`${GET_CANVAS_ID}${canvasId}`, token);
  }

  removeCanvas(id, token): Observable<any> {
    return this.apiMiddleware.removeCanvas(`${DELETE_CANVAS}${id}`, token);
  }
}
