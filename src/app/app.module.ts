import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { CharactersService } from './services/firebase/characters.service';
import { AuthService } from "./util/auth";
import { APIMiddleware } from "./services/APIMiddleware";
import { NgxIndexedDBModule } from 'ngx-indexed-db';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(environment.INDEXEDDB_CONFIG),
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireDatabaseModule
  ],
  
  providers: [
    CharactersService,
    AuthService,
    APIMiddleware,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
