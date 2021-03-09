import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { WaitingScoresService } from 'src/app/services/waiting-scores/waiting-scores.service';

@Component({
  selector: 'app-waiting-scores',
  templateUrl: './waiting-scores.page.html',
  styleUrls: ['./waiting-scores.page.scss'],
})
export class WaitingScoresPage implements OnInit {

  public isGameStartedObservable;

  public gameId: any;

  constructor(public navCtrl: NavController,
    public dbService: NgxIndexedDBService,
    public _waitingScoresService: WaitingScoresService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = params["gameId"];
    });
    this.openWaitingGameSocket();
    this.checkIfGameStarted();
  }

  ngOnDestroy() {
    this._waitingScoresService.closeWebSockets();
  }

  checkIfGameStarted() {
    this._waitingScoresService.isGameFinishedChange.subscribe(isGameFinished => {
      if (isGameFinished) {
        this.goToScoresPage();
      }
    });
  }

  goToScoresPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        gameId: this.gameId,
      }
    }
    this.navCtrl.navigateForward('role-playing/scores', navigationExtras)
  }

  openWaitingGameSocket() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._waitingScoresService.openWaitingScoresWebSocket(this.gameId, token.value.token);
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
