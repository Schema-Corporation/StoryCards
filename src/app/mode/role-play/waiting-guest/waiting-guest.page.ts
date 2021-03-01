import { Component, EventEmitter, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { RolePlayingGuestService } from 'src/app/services/role-playing/role-playing-guest/role-playing-guest.service';

@Component({
  selector: 'app-waiting-guest',
  templateUrl: './waiting-guest.page.html',
  styleUrls: ['./waiting-guest.page.scss'],
})
export class WaitingGuestPage implements OnInit {

  public isGameStartedObservable;

  constructor(public navCtrl: NavController,
    public dbService: NgxIndexedDBService,
    public _rolePlayingGuestService: RolePlayingGuestService) { }

  ngOnInit() {
    this.openWaitingRoomSocket();
    this.checkIfGameStarted();
  }

  checkIfGameStarted() {
    this._rolePlayingGuestService.isGameStartedChange.subscribe(isGameStarted => {
      if (isGameStarted) {
        this.goToCreateCharacterPage();
      }
    });
  }

  goToCreateCharacterPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        gameId: JSON.stringify(this._rolePlayingGuestService.gameId),
      }
    }
    this.navCtrl.navigateForward('role-playing/create-character', navigationExtras);
  }

  ngOnDestroy() {
    this._rolePlayingGuestService.closeWebSockets();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  openWaitingRoomSocket() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._rolePlayingGuestService.openWaitingRoomWebSocket(token.value.guestData.roomId, token.value.token);
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

  leaveRoom() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._rolePlayingGuestService.leaveWaitingRoom(token.value.token).subscribe(role => {
          console.log('role: ', role);
        }, error => {
          console.log('error: ', error);
        })

      },
      error => {
        this.closeSession();
      });
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }

}
