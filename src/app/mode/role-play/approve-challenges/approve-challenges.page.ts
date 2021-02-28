import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-approve-challenges',
  templateUrl: './approve-challenges.page.html',
  styleUrls: ['./approve-challenges.page.scss'],
})
export class ApproveChallengesPage implements OnInit {

  public challenges: any = [];
  public gameId: any;

  constructor(public route: ActivatedRoute,
    public location: Location,
    public alertCtrl: AlertController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = params["gameId"];
      this.getChallenges(this.gameId);
    });
    this.location.replaceState('/role-playing/approve-challenges');
  }

  getChallenges(gameId: any) {
    console.log('gameId: ', gameId);
    this.challenges = [
      {
        id: '1',
        challenge: 'Mi jefe no me trata bien en el trabajo',
        participant: 'Marcelo Ríos'
      },
      {
        id: '2',
        challenge: 'El día de ayer hubo un simulacro de sismos y ninguno de mis compañeros realizó el protocolo',
        participant: 'Juan Pérez'
      }
    ]
  }

  rejectChallenge(id: any) {
    console.log('TO-DO: REJECT CHALLENGE');
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (min - max) + max);
  }

  acceptChallenge(id: any, level: any) {
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
    console.log('TO-DO: ACCEPT CHALLENGE');

  }

  async showAlertAcceptChallenge(id: any) {
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
            this.acceptChallenge(id, data);
          }
        }
      ]
    });

    await alert.present();
  }

}
