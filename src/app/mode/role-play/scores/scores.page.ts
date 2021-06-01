import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnswerService } from 'src/app/services/answer/answer.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { RolePlayingGuestService } from 'src/app/services/role-playing/role-playing-guest/role-playing-guest.service';
import { ScoreService } from 'src/app/services/score/score.service';
import { ExcelService } from 'src/app/util/ExcelService';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { OcFileStorageService } from 'src/app/util/OcFileStorageService';

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

  public pdfObject = null;

  constructor(public navCtrl: NavController,
    public toastController: ToastController,
    public dbService: NgxIndexedDBService,
    public _scoresService: ScoreService,
    public _answerServices: AnswerService,
    public _loginService: LoginService,
    public _rolePlayingGuestService: RolePlayingGuestService,
    public _excelService: ExcelService,
    public route: ActivatedRoute,
    public ocFileStorageSvc: OcFileStorageService) { }

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
    
    this._excelService.exportAsExcelFile(aoaData, 'SistemaD6');
  }

  getImage(baseURL, numberImage, typeImage): Promise<string> {
    // Get data from subscriber and pass to image src
    return this.ocFileStorageSvc
      .getImageFromURL(baseURL + numberImage + typeImage).toPromise();
  }

  async downloadReport() {
    var base64ImageLogo = await this.getImage('/assets/icon/logo.png', '', '');
    this.generateHTML(base64ImageLogo);
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  generateHTML(base64ImageLogo: string) {

    var docDefinition = {
      pageSize: {
        width: 650,
        height: 'auto'
      },
      content: [
        this.getHTML(base64ImageLogo)
      ]
    };

    this.pdfObject = pdfMake.createPdf(docDefinition);

    this.pdfObject.download('SistemaD6.pdf');

    this.presentToast('Formato descargado');

  }

  getHTML(base64ImageLogo: string) {

    var challengesText = '';
    for (var i = 0; i < this.allChallenges.length; i++) {
      var answersText = '';
      challengesText = challengesText + `
      <tr style="border: none">
        <td width="330" height="25" valign="top">
        </td>
        <td width="330" height="25" valign="top">
        </td>
      </tr>
      <tr style="border: 1px solid">
        <td style="background-color: #FF0000" width="330" valign="top">
            <p style="text-align:center">
                <strong>
                  Reto ${i+1}
                </strong>
            </p>
        </td>
        <td width="330" valign="top">
            <p style="text-align:center">
                <strong>
                  ${this.allChallenges[i].challengeBody}
                </strong>
            </p>
        </td>
      </tr>
      `;
      const answersToChallenge = this.allAnswers.filter(x => x.challengeId == this.allChallenges[i].challengeId).sort((a, b) => {
        if (a.fullName > b.fullName) {
          return 1;
        }
        else {
          return -1;
        }
      });
      for (var j = 0; j < answersToChallenge.length; j++) {
        answersText = answersText + `
        <tr style="border: none">
          <td width="330" height="25" valign="top">
          </td>
          <td width="330" height="25" valign="top">
          </td>
        </tr>
        <tr style="border: none">
          <td width="330" valign="top">
              <p style="text-align:center">
                  <strong>
                    Participante ${j+1}
                  </strong>
              </p>
          </td>
          <td style="border: 1px solid" width="330" valign="top">
              <p style="text-align:center">
                  <strong>
                    ${answersToChallenge[j].fullName}
                  </strong>
              </p>
          </td>
        </tr>
        <tr style="border: none">
          <td width="330" valign="top">
              <p style="text-align:center">
                  <strong>
                    
                  </strong>
              </p>
          </td>
          <td style="border: 1px solid" width="330" valign="top">
              <p style="text-align:center">
                  <strong>
                    ${answersToChallenge[j].answerText}
                  </strong>
              </p>
          </td>
        </tr>`
      };
      challengesText = challengesText + answersText;
    }

    var htmlText = `
    <img src="${base64ImageLogo}" width="250" height="75" style="opacity: 0.4; margin-left: 500px; margin-bottom: 10px;">
    <table cellspacing="0" cellpadding="0" width="660">
      <tbody>` + challengesText +
      `</tbody>
    </table>
    `

    var html = htmlToPdfmake(htmlText);
    return html;
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }


}
