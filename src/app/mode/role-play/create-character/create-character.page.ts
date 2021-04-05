import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, IonApp, NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { GameService } from 'src/app/services/game/game.service';
import { IParticipant } from 'src/common/types/participant';
import { IAbility } from 'src/common/types/participant';
import * as uuid from 'uuid';


@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
})
export class CreateCharacterPage implements OnInit {

  public step:number = 1;
  public character:number = -1;
  public avatar: number = -1;

  public firstAbility: string = "";
  public secondAbility: string = "";
  public thirdAbility: string = "";
  public fourthAbility: string = "";
  public fifthAbility: string = "";
  public sixthAbility: string = "";
  public seventhAbility: string = "";

  public firstAbilityPoints:number = 1;
  public secondAbilityPoints:number = 1;
  public thirdAbilityPoints:number = 1;

  public fourthAbilityPoints:number = 0;
  public fifthAbilityPoints:number = 0;
  public sixthAbilityPoints:number = 0;
  public seventhAbilityPoints:number = 0;

  public pointsAvailable:number = 15;
  public abilitiesChosen: number = 3;

  public isNext: number = 4;
  public pointsReady: boolean = false;

  public fourthReady: boolean = false;
  public fifthReady: boolean = false;
  public sixthReady: boolean = false;
  public seventhReady: boolean = false;

  public maximumCharactersAllowed: number = 200;
  public challengeCharacters: number = 0;

  public challenge: string;

  public participant: IParticipant;

  public gameId: string;

  public showWaitingForChallengeApprovalView: boolean = false;

  constructor(private alertCtrl: AlertController,
    public route: ActivatedRoute,
    public dbService: NgxIndexedDBService,
    public navCtrl: NavController,
    public _gameService: GameService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = (params["gameId"]).replace(/"/g, '');
    });
    this.openChallengeSocket();
    this.checkIfChallengeApproved();
  }

  ngOnDestroy() {
    this._gameService.closeWebSockets();
  }

  openChallengeSocket() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._gameService.openChallengeApprovalWebSocket(token.value.guestData.id, token.value.token)
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

  checkIfChallengeApproved() {
    this._gameService.response.subscribe(response => {
      switch (response) {
        case 'approved': this.goToWaitingGamePage(); break;
        case 'rejected': this.notifyRejectReason(); break;
      }
    });
  }

  notifyRejectReason() {
    this.hideWaitingForChallengeApprovalModal();
    this.challenge = '';
    this.challengeCharacters = 0;
    this.showRejectReason();
  }

  showRejectReason() {
    this.showRejectChallengeAlert(this._gameService.reason);
  }

  goToWaitingGamePage() {
    this.createCharacter();
    let navigationExtras: NavigationExtras = {
      queryParams: {
        gameId: this.gameId,
        character: JSON.stringify(this.participant)
      }
    }
    this.navCtrl.navigateForward('role-playing/waiting-game', navigationExtras)
  }

  addStep(){
    this.step++
  }

  setAbility(character) {
    switch (character) {
      case 1: this.firstAbility = "Buen trato"; this.secondAbility = "Idealista"; this.thirdAbility = "Abierto al cambio"; break;
      case 2: this.firstAbility = "Autonomía"; this.secondAbility = "Aprendizaje"; this.thirdAbility = "Emprendimiento"; break;
      case 3: this.firstAbility = "Valentía"; this.secondAbility = "Perseverancia"; this.thirdAbility = "Habilidad"; break;
      case 4: this.firstAbility = "Análisis"; this.secondAbility = "Independencia"; this.thirdAbility = "Curiosidad"; break;
      case 5: this.firstAbility = "Perspectiva"; this.secondAbility = "Persuasión"; this.thirdAbility = "Carisma"; break;
      case 6: this.firstAbility = "Genera cambios"; this.secondAbility = "Motivador"; this.thirdAbility = "Inspirador"; break;
      case 7: this.firstAbility = "Compromiso"; this.secondAbility = "Lealtad"; this.thirdAbility = "Diplomacía"; break;
      case 8: this.firstAbility = "Colaborativo"; this.secondAbility = "Honestidad"; this.thirdAbility = "Practicidad"; break;
      case 9: this.firstAbility = "Optimismo"; this.secondAbility = "Dinamismo"; this.thirdAbility = "Flexibilidad"; break;
      case 10: this.firstAbility = "Empatía"; this.secondAbility = "Solidaridad"; this.thirdAbility = "Responsabilidad social"; break;
      case 11: this.firstAbility = "Visionario"; this.secondAbility = "Creatividad"; this.thirdAbility = "Iniciativa"; break;
      case 12: this.firstAbility = "Liderazgo"; this.secondAbility = "Responsable"; this.thirdAbility = "Comunicación"; break;
      default: break;
    }
  }

  validatePoints() {
    return this.pointsAvailable == 0 && this.pointsReady;
  }

  updateAvailablePoints(operation) {
    operation == 'minus' ? this.pointsAvailable++ : this.pointsAvailable--;
  }

  updatePoints(ability, operation) {
    var abilitiesLeft = 0;
    if (this.fourthAbilityPoints == 0) abilitiesLeft++;
    if (this.fifthAbilityPoints == 0) abilitiesLeft++;
    if (this.sixthAbilityPoints == 0) abilitiesLeft++;
    if (this.seventhAbilityPoints == 0) abilitiesLeft++;

    var valid = true;
    if (operation == 'minus') {
      switch (ability) {
        case 1: this.firstAbilityPoints > 1 ? this.firstAbilityPoints-- : valid = false; break;
        case 2: this.secondAbilityPoints > 1 ? this.secondAbilityPoints-- : valid = false; break;
        case 3: this.thirdAbilityPoints > 1 ? this.thirdAbilityPoints-- : valid = false; break;
        case 4: this.fourthAbilityPoints > 1 ? this.fourthAbilityPoints-- : valid = false; break;
        case 5: this.fifthAbilityPoints > 1 ? this.fifthAbilityPoints-- : valid = false; break;
        case 6: this.sixthAbilityPoints > 1 ? this.sixthAbilityPoints-- : valid = false; break;
        case 7: this.seventhAbilityPoints > 1 ? this.seventhAbilityPoints-- : valid = false; break;
      }
    } else {
      if (this.pointsAvailable >= 1 + abilitiesLeft) {
        if (operation == 'plus') {
          switch (ability) {
            case 1: this.firstAbilityPoints < 5 ? this.firstAbilityPoints++ : valid = false; break;
            case 2: this.secondAbilityPoints < 5 ? this.secondAbilityPoints++ : valid = false; break;
            case 3: this.thirdAbilityPoints < 5 ? this.thirdAbilityPoints++ : valid = false; break;
            case 4: this.fourthAbilityPoints < 5 ? this.fourthAbilityPoints++ : valid = false; break;
            case 5: this.fifthAbilityPoints < 5 ? this.fifthAbilityPoints++ : valid = false; break;
            case 6: this.sixthAbilityPoints < 5 ? this.sixthAbilityPoints++ : valid = false; break;
            case 7: this.seventhAbilityPoints < 5 ? this.seventhAbilityPoints++ : valid = false; break;
          }
        }
      } else {
        valid = false;
      }
    }
    if (valid) this.updateAvailablePoints(operation);
  }

  createAbility(data, number) {
    switch (number) {
      case 4: this.fourthAbility = data; this.fourthReady = true; this.fourthAbilityPoints = 1; break;
      case 5: this.fifthAbility = data; this.fifthReady = true; this.fifthAbilityPoints = 1; break;
      case 6: this.sixthAbility = data; this.sixthReady = true; this.sixthAbilityPoints = 1; break;
      case 7: this.seventhAbility = data; this.seventhReady = true; this.seventhAbilityPoints = 1; this.pointsReady = true; break;
      default: break;
    }
    this.pointsAvailable--;
    this.abilitiesChosen++;
    this.isNext++;
  }

  generateList(character) {
    var result = [];
    var abilities = ['Buen trato', 'Idealista', 'Abierto al cambio', 'Autonomía', 'Aprendizaje', 'Emprendimiento', 'Valentía', 'Perseverancia',
      'Habilidad', 'Análisis', 'Independencia', 'Curiosidad', 'Perspectiva', 'Persuasión', 'Carisma', 'Genera cambios', 'Motivador', 'Inspirador',
      'Compromiso', 'Lealtad', 'Diplomacía', 'Colaborativo', 'Honestidad', 'Practicidad', 'Optimismo', 'Dinamismo', 'Flexibilidad', 'Empatía',
      'Solidaridad', 'Responsabilidad social', 'Visionario', 'Creatividad', 'Iniciativa', 'Liderazgo', 'Responsable', 'Comunicación'];
    // remove predefined abilities from the list
    abilities.splice((character - 1) * 3, 3);
    // remove ability already chosen from the list
    var fourthAbilityIndex;
    var fifthAbilityIndex;
    var sixthAbilityIndex;
    abilities.forEach((ability, index) => {
      if (ability == this.fourthAbility) fourthAbilityIndex = index;
      if (ability == this.fifthAbility) fifthAbilityIndex = index;
      if (ability == this.sixthAbility) sixthAbilityIndex = index;
    });
    var indexes = [];
    if (fourthAbilityIndex != undefined) indexes.push(fourthAbilityIndex);
    if (fifthAbilityIndex != undefined) indexes.push(fifthAbilityIndex);
    if (sixthAbilityIndex != undefined) indexes.push(sixthAbilityIndex);
    // sort indexes
    indexes.sort(function(a,b){ return a-b; });

    // remove selected abilities
    while (indexes.length) {
      abilities.splice(indexes.pop(), 1);
    }
    // add all the other activities to the list
    abilities.forEach((ability, index) => {
      var inputElement;
      if (index == 0) {
        inputElement = {
          name: 'radio' + index,
          type: 'radio',
          label: ability,
          value: ability,
          checked: true
        }
      } else {
        inputElement = {
          name: 'radio' + index,
          type: 'radio',
          label: ability,
          value: ability
        }
      }
      result.push(inputElement);
    });
    return result;
  }

  async showAlert(number) {
    var alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Crear competencia',
      inputs: this.generateList(this.character),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data: string) => {
            this.createAbility(data, number);
          }
        }
      ]});

    await alert.present();
  }

  async showRejectChallengeAlert(reason) {
    var alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Reto rechazado',
      message: 'Tu reto ha sido rechazado por la siguiente razón: ' + '<strong>' + reason + '</strong>',
      buttons: [
        {
          text: 'Entendido',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }
      ]});

    await alert.present();
  }

  validateChallenge() {
    return this.challengeCharacters > 0;
  }

  writeChallenge(ev: CustomEvent) {
    this.challenge = ev.detail.value;
    this.challengeCharacters = ev.detail.value.length;
  }

  getAbilities() {
    var firstAbility = {
      name: this.firstAbility,
      points: this.firstAbilityPoints
    };
    var secondAbility = {
      name: this.secondAbility,
      points: this.secondAbilityPoints
    };
    var thirdAbility = {
      name: this.thirdAbility,
      points: this.thirdAbilityPoints
    };
    var fourthAbility = {
      name: this.fourthAbility,
      points: this.fourthAbilityPoints
    };
    var fifthAbility = {
      name: this.fifthAbility,
      points: this.fifthAbilityPoints
    };
    var sixthAbility = {
      name: this.sixthAbility,
      points: this.sixthAbilityPoints
    };
    var seventhAbility = {
      name: this.seventhAbility,
      points: this.seventhAbilityPoints
    };
    var listAbilities = new Array<IAbility>();
    listAbilities.push(firstAbility, secondAbility, thirdAbility, fourthAbility, fifthAbility, sixthAbility, seventhAbility);
    return listAbilities;
  }

  async showSuccess(message) {
    var alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¡Felicidades!',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  createCharacter() {
    const avatarId = this.avatar.toString();
    this.participant = {
      character: this.character,
      abilities: this.getAbilities(),
      challenge: this.challenge,
      avatar: avatarId
    };
  }

  sendChallenge() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        var challengeObject = {
          challengeId: uuid.v4(),
          gameId: this.gameId,
          roomId: token.value.guestData.roomId,
          guestId: token.value.guestData.id,
          fullName: token.value.guestData.identifier,
          challengeBody: this.challenge,
          status: 0,
          points: 0,
        };
        this.showWaitingForChallengeApprovalModal();
        this._gameService.sendChallengeForApproval(this.gameId, challengeObject, token.value.token).subscribe(challenge => {
          this.showWaitingForChallengeApprovalModal();
        }, error => {
          console.log('error: ', error);
          this.closeSession();
        });
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

  hideWaitingForChallengeApprovalModal() {
    this.showWaitingForChallengeApprovalView = false;
  }

  showWaitingForChallengeApprovalModal() {
    this.showWaitingForChallengeApprovalView = true;
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }
}
