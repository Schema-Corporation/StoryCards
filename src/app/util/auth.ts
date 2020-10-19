import { CanActivate, Router, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from '../services/auth/login.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService implements CanActivate {
  constructor(
    public router: Router,
    public _authService: LoginService,
    private dbService: NgxIndexedDBService
  ){ }

  canActivate(): Observable<boolean> {
    return this.dbService.getByIndex('variables', 'name', 'token').pipe(
        map(response => {
            if (response != null) {
                return true;
            } else {
                return false;
            }
        })
    );
  }
}
