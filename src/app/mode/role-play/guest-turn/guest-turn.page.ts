import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { IonSelect, NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as uuid from 'uuid';
import { GuestTurnService } from 'src/app/services/guest-turn/guest-turn.service';

@Component({
  selector: 'app-guest-turn',
  templateUrl: './guest-turn.page.html',
  styleUrls: ['./guest-turn.page.scss'],
})

// refer to the select via the template reference


export class GuestTurnPage implements OnInit {

  public challengeNumber: number = 0;
  public score: number = 0;
  public developmentPoints: number = 0;
  public maximumCharactersAllowed: number = 200;
  public destinyPoints: number = 0;
  public useDevelopmentPoints: number = 0;
  public useDestinyPoints: number = 0;
  public challenges:any = [];
  public competencies:any = [];
  public answerCharacters: number = 0;
  public answer:string = "";
  public competency: any;

  public showRollDiceModal: boolean = false;
  public dices: any = [];

  public maxDiceValue = 6;
  public minDiceValue = 1;

  public indexRow = 0;
  public indexColumn = 0;
  public rows: any;
  public columns: any;

  public dicesSum = 0;
  public challengeDifficulty = 0;

  public gameId: any;
  public character: any;
  public avatar: any = -1;
  public avatarPath: string;

  public showChallenges: boolean;

  @ViewChild('projectSelect', { static: false }) projectSelect: IonSelect;

  constructor(public navCtrl: NavController,
    public dbService: NgxIndexedDBService,
    public _guestTurnService: GuestTurnService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = (params["gameId"]).replace(/"/g, '');
      this.character = JSON.parse(JSON.parse(params["character"]));
      this.avatar = this.character.avatar;
      this.avatarPath = `/assets/cards/avatars/avatars_${this.avatar}_im.svg`;
    });
    this.participantSetUp();
    this.challengesSetUp();
    this.competenciesSetUp();
  }

  participantSetUp() {
    this.score = 0;
    this.developmentPoints = 5;
    this.destinyPoints = 1;
  }

  challengesSetUp() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._guestTurnService.getChallenges(this.gameId, token.value.token).subscribe(challenges => {
          console.log('challenges: ', challenges);
          this.challenges = challenges.filter(x => x.status == 1);
          this.showChallenges = true;
        }, error => {
          this.closeSession();
          console.log('error: ', error);
        });
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
    });
  }

  competenciesSetUp() {
    for (var i = 0; i < this.character.abilities.length; i++) {
      this.competencies.push({
        id: i,
        text: this.character.abilities[i].name,
        points: this.character.abilities[i].points
      });
    }
  }

  writeAnswer(ev: CustomEvent) {
    this.answer = ev.detail.value;
    this.answerCharacters = ev.detail.value.length;
  }

  selectCompetency(ev: CustomEvent) {
    this.competency = ev.detail.value;
  }

  notEnoughData(): boolean {
    if (this.answerCharacters == 0 || this.competency == null || this.showRollDiceModal) return true;
    return false;
  }

  useTurn() {
    this.rollDices();
    this.showRollDiceModal = true;
  }

  getRandomInt() {
    return Math.floor(Math.random() * (this.maxDiceValue - this.minDiceValue) + this.minDiceValue);
  }

  rollDices() {
    const dicesNumber = this.competency.points * (this.useDestinyPoints ? 2 : 1) + this.useDevelopmentPoints;
    var numberOfRows = Math.floor(dicesNumber / 3);
    var numberOfColumns = 3;
    this.rows = [];
    this.columns = [];
    for (var i = 0; i < numberOfRows; i++) {
      this.rows.push(i);
    }
    for (var i = 0; i < numberOfColumns; i++) {
      this.columns.push(i);
    }
    if (dicesNumber % 3 != 0) this.rows.push(numberOfRows);

    this.dicesSum = 0;
    this.dices = [];
    for (var i = 0; i < dicesNumber; i++) {
      const random = this.getRandomInt();
      this.dices.push(random);
      this.dicesSum += random;
    }
  }

  endTurn() {
    this.showRollDiceModal = false;
    this.registerAnswer();
  }

  registerAnswer() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        var answerBody = {
          answerId: uuid.v4(),
          challengeId: this.challenges[this.challengeNumber].challengeId,
          guestId: token.value.guestData.id,
          fullName: token.value.guestData.identifier,
          answerText: this.answer,
          competency: this.competency,
          scoreObtained: this.dicesSum,
          challengeDifficulty: this.challenges[this.challengeNumber].points,
          extraPoints: 0
        }
        console.log('answerBody: ', answerBody)
        this._guestTurnService.postAnswer(this.gameId, answerBody, token.value.token).subscribe(answer => {
          this.updateScore();
          this.clearFields();
          if (!this.gameIsFinished()) this.goToNextChallenge()
          else this.showWaitingScoresPage();
        }, error => {
          this.closeSession();
          console.log('error: ', error);
        })
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
    console.log('TO-DO: REGISTER ANSWER IN REDIS');
  }

  updateScore() {
    this.score += this.dicesSum - this.challenges[this.challengeNumber].points;
    if (this.useDestinyPoints) {
      this.useDestinyPoints = 0;
      this.destinyPoints--;
    }
    if (this.useDevelopmentPoints) {
      this.useDevelopmentPoints = 0;
      this.developmentPoints--;
    }
  }

  goToNextChallenge() {
    this.challengeNumber = this.challengeNumber + 1;
  }

  removeUsedCompetency() {
    for (var i =0; i < this.competencies.length; i++)
    if (this.competencies[i].id === this.competency.id) {
        this.competencies.splice(i,1);
        break;
    }
    this.projectSelect.value = '';
    this.competency = null;
  }

  clearFields() {
    this.useDevelopmentPoints = 0;
    this.useDestinyPoints = 0;
    this.removeUsedCompetency();
    this.answer = '';
    this.answerCharacters = 0;
    this.dicesSum = 0;
    this.dices = 0;
  }

  gameIsFinished() {
    return this.challenges.length == this.challengeNumber + 1;
  }

  showWaitingScoresPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        gameId: this.gameId,
      }
    }
    this.navCtrl.navigateForward(['role-playing/waiting-scores'], navigationExtras);
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }
}
