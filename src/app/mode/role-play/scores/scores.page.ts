import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { LoginService } from 'src/app/services/auth/login.service';
import { ScoreService } from 'src/app/services/score/score.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {

  public gameId: any;
  public participantScores: any = [];
  public isGameEndObservable;
  public role: any;
  public showFinishGameButton: boolean = false;

  constructor(public navCtrl: NavController,
    public dbService: NgxIndexedDBService,
    public _scoresService: ScoreService,
    public _loginService: LoginService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = params["gameId"];
      this.getParticipantScores(this.gameId);
      this.getRole();
      this.openFinishGameSocket();
      this.checkIfGameFinished();
    });
  }

  ngOnDestroy() {
    this._scoresService.closeWebSockets();
  }

  getRole() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._loginService.validateRole(token.value.token).subscribe(role => {
          switch (role.role) {
            case 'HOST': this.role = 1; this.setUpForHost(); break;
            case 'GUEST': this.role = 2; this.setUpForGuest(); break;
            default: this.role = -1; break;
          }
        }, error => {
          console.log('error: ', error);
        })
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

  setUpForHost() {
    this.showFinishGameButton = true;
  }

  setUpForGuest() {
    this.openFinishGameSocket();
    this.checkIfGameFinished();
  }

  openFinishGameSocket() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._scoresService.openFinishGameWebSocket(this.gameId, token.value.token);
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

  checkIfGameFinished() {
    this._scoresService.isGameEndedChange.subscribe(isGameEnded => {
      if (isGameEnded) {
        this.goToMainPage();
      }
    });
  }

  goToMainPage() {
    this.navCtrl.navigateForward('menu/main');
  }

  finishGame() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        console.log('token: ', token.value.token);
        this._scoresService.endGame(this.gameId, token.value.token).subscribe(gameEnded => {
          this.goToMainPage();
        }, error => {
          console.log('error: ', error);
        });
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

  getParticipantScores(gameId) {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._scoresService.getScores(gameId, token.value.token).subscribe(scores => {
          this.participantScores = scores;
        }, error => {
          console.log('error: ', error);
        });
      },
      error => {
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
