import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Location } from "@angular/common";
import { AlertController, NavController } from '@ionic/angular';
import { ChallengesService } from 'src/app/services/challenges/challenges.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-approve-challenges',
  templateUrl: './approve-challenges.page.html',
  styleUrls: ['./approve-challenges.page.scss'],
})
export class ApproveChallengesPage implements OnInit {

  public challenges: any = [];
  public gameId: any;
  public numParticipants: number;
  public numApprovedChallenges: number = 0;
  public showGoToStartGameButton: boolean = false;

  constructor(public route: ActivatedRoute,
    public location: Location,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public dbService: NgxIndexedDBService,
    public _challengesServices: ChallengesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = params["gameId"];
      this.numParticipants = params["numParticipants"];
      this.dbService.getByIndex('variables', 'name', 'token').subscribe(
        token => {
          this._challengesServices.openChallengesListWebSocket(this.gameId, token.value.token);
          this.numApprovedChallenges = this._challengesServices.challengesList.filter(x => x.status == 1).length;
        },
        error => {
          this.closeSession();
          console.log('error: ', error);
        });
    });
    // this.location.replaceState('/role-playing/approve-challenges');
  }

  rejectChallenge(challenge: any) {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._challengesServices.rejectChallenge(this.gameId, challenge.guestId, token.value.token).subscribe(challenge => {
          this._challengesServices.getChallengesApproval(this.gameId, token.value.token);
        }, error => {
          this.closeSession();
          console.log('error: ', error);
        })
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (min - max) + max);
  }

  getChallengesListPendingForApproval() {
    return this._challengesServices.challengesList.filter(x => x.status == 0);
  }

  acceptChallenge(challenge: any, level: any) {
    var challengePoints = 0;
    switch (level) {
      case 0: challengePoints = this.getRandomInt(5, 5); break;
      case 1: challengePoints = this.getRandomInt(6, 10); break;
      case 2: challengePoints = this.getRandomInt(11, 15); break;
      case 3: challengePoints = this.getRandomInt(16, 20); break;
      case 4: challengePoints = this.getRandomInt(21, 25); break;
      case 5: challengePoints = this.getRandomInt(26, 30); break;
      default: break;
    }

    var challengeBody = {
      guestId: challenge.guestId,
      fullName: challenge.fullName,
      status: 1,
      points: challengePoints
    }

    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._challengesServices.acceptChallenge(this.gameId, challengeBody, token.value.token).subscribe(challenge => {
          this._challengesServices.getChallengesApproval(this.gameId, token.value.token);
          this.numApprovedChallenges++;
          if (this.numApprovedChallenges == this.numParticipants) {
            this.showGoToGameButton();
          }
        }, error => {
          this.closeSession();
          console.log('error: ', error);
        })
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

  showGoToGameButton() {
    this.showGoToStartGameButton = true;
  }

  goToWatchGamePage() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._challengesServices.goToStartGame(this.gameId, token.value.token).subscribe(game => {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              gameId: this.gameId,
              numParticipants: this.numParticipants
            }
          }
          this.navCtrl.navigateForward('role-playing/evaluate-answers', navigationExtras);
        }, error => {
          this.closeSession();
          console.log('error: ', error);
        })
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

  async showAlertAcceptChallenge(challenge: any) {
    var alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Aceptar Reto',
      message: 'Por favor, ingrese un nivel de dificultad para este reto',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Muy fácil - 5',
          value: 0,
          checked: true
        },

        {
          name: 'radio2',
          type: 'radio',
          label: 'Fácil - 6 a 10',
          value: 1
        },

        {
          name: 'radio3',
          type: 'radio',
          label: 'Moderado  - 11 a 15',
          value: 2
        },

        {
          name: 'radio4',
          type: 'radio',
          label: 'Difícil - 16 a 20',
          value: 3
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Muy difícil - 21 a 25',
          value: 4
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Heroíco - 26 a 30',
          value: 5
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            this.acceptChallenge(challenge, data);
          }
        }
      ]
    });

    await alert.present();
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }

}
