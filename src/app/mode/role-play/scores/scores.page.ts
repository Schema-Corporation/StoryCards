import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnswerService } from 'src/app/services/answer/answer.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { RolePlayingGuestService } from 'src/app/services/role-playing/role-playing-guest/role-playing-guest.service';
import { ScoreService } from 'src/app/services/score/score.service';
import { ExcelService } from 'src/app/util/ExcelService';

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

  public allAnswers = [];
  public allChallenges = [];

  constructor(public navCtrl: NavController,
    public dbService: NgxIndexedDBService,
    public _scoresService: ScoreService,
    public _answerServices: AnswerService,
    public _loginService: LoginService,
    public _rolePlayingGuestService: RolePlayingGuestService,
    public _excelService: ExcelService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = (params["gameId"]).replace(/"/g, '');
      this.getParticipantScores(this.gameId);
      this.getRole();
      this.getAllChallenges(this.gameId);
    });
  }

  getAllChallenges(gameId) {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this.getChallenges(gameId, token.value.token);
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
    });
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
        this.dbService.getByIndex('variables', 'name', 'token').subscribe(
          token => {
            this._rolePlayingGuestService.leaveWaitingRoom(token.value.token).subscribe(role => {
              this.goToMainPage();
            }, error => {
              this.closeSession();
            })
          },
          error => {
            this.closeSession();
          });
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
        this._scoresService.getScores(gameId, token.value.token).subscribe(answers => {
          this.allAnswers = answers;
          console.log('scores: ', answers);
          const participants = {};
          this.getScoresFromAnswers(answers);
        }, error => {
          console.log('error: ', error);
        });
      },
      error => {
        console.log('error: ', error);
      });
  }

  getScoresFromAnswers(answers) {
    var participants = [];
    var names = {};
    var participantScores = [];
    answers.forEach(answer => {
      if (participants.indexOf(answer.guestId) == -1) {
        participants.push(answer.guestId);
        names[answer.guestId] = answer.fullName
      }
    });
    participants.forEach(participant => {
      var scoreOfParticipant = 0;
      var extraPointsOfParticipant = 0;
      answers.filter(x => x.guestId == participant).forEach(answer => {
          scoreOfParticipant = scoreOfParticipant + answer.scoreObtained;
          extraPointsOfParticipant = extraPointsOfParticipant + answer.extraPoints;
      });
      participantScores.push({
        guestId: participant,
        name: names[participant],
        score: scoreOfParticipant,
        extraPoints: extraPointsOfParticipant,
        finalScore: scoreOfParticipant + extraPointsOfParticipant
      });
    });
    participantScores.sort((a, b) => {
      return b.finalScore - a.finalScore;
    });
    this.participantScores = participantScores;
  }

  getChallenges(gameId, token) {
    this._answerServices.getChallenges(gameId, token).subscribe(
      challenges => {
        console.log('challenges: ', challenges);
        this.allChallenges = challenges.filter(x => x.status == 1);
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
    });
  }

  downloadAnalysis() {
    const aoaData = [
      ['', 'ROLEPLAYING GAME 6D - RETOS'],
      ['', 'SOLUCIONES PLANTEADAS A LOS RETOS PROPUESTOS'],
      ['', '']
    ];
    for (var i = 0; i < this.allChallenges.length; i++) {
      aoaData.push(['Reto ' + (i + 1), this.allChallenges[i].challengeBody]);
      const answersToChallenge = this.allAnswers.filter(x => x.challengeId == this.allChallenges[i].challengeId).sort((a, b) => {
        if (a.fullName > b.fullName) {
          return 1;
        }
        else {
          return -1;
        }
      });
      for (var j = 0; j < answersToChallenge.length; j++) {
        aoaData.push(['', '']);
        aoaData.push(['Participante ' + (j + 1), answersToChallenge[j].fullName]);
        aoaData.push(['', answersToChallenge[j].answerText]);
      }
      aoaData.push(['', '']);
    }
    console.log('allAnswers: ', this.allAnswers);
    console.log('allChallenges: ', this.allChallenges);
    
    this._excelService.exportAsExcelFile(aoaData, 'SistemaD6');
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }


}
