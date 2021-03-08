import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { WaitingGameService } from 'src/app/services/waiting-game/waiting-game.service';

@Component({
  selector: 'app-waiting-game',
  templateUrl: './waiting-game.page.html',
  styleUrls: ['./waiting-game.page.scss'],
})
export class WaitingGamePage implements OnInit {

  public isGameStartedObservable;

  public gameId: any;
  public character: any;

  constructor(public navCtrl: NavController,
    public dbService: NgxIndexedDBService,
    public _waitingGameService: WaitingGameService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = params["gameId"];
      this.character = JSON.parse(JSON.stringify(params["character"]))
    });
    this.openWaitingGameSocket();
    this.checkIfGameStarted();
  }

  ngOnDestroy() {
    this._waitingGameService.closeWebSockets();
  }

  checkIfGameStarted() {
    this._waitingGameService.isGameStartedChange.subscribe(isGameStarted => {
      if (isGameStarted) {
        this.goToGuestTurnPage();
      }
    });
  }

  goToGuestTurnPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        character: JSON.stringify(this.character)
      }
    }
    this.navCtrl.navigateForward('role-playing/guest-turn', navigationExtras)
  }

  openWaitingGameSocket() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._waitingGameService.openWaitingGameWebSocket(this.gameId, token.value.token);
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
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
