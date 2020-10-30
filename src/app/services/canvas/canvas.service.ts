import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from "../../../common/constants";
import { APIMiddleware } from '../APIMiddleware';

const GET_CANVAS = apiUrls.GET_CANVAS;
const POST_CANVAS = apiUrls.POST_CANVAS;

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
}
