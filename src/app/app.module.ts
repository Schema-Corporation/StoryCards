import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AuthService } from "./util/auth";
import { APIMiddleware } from "./services/APIMiddleware";
import { NgxIndexedDBModule } from 'ngx-indexed-db';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx'

import { IonicSelectableModule } from 'ionic-selectable';
import { SettingComponent } from './menu/setting/setting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AppComponent, SettingComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(environment.INDEXEDDB_CONFIG),
    IonicSelectableModule,
    NgbModule
  ],
  providers: [
    AuthService,
    APIMiddleware,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    FileOpener
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
