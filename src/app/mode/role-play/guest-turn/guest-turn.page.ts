import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect, NavController } from '@ionic/angular';

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

  @ViewChild('projectSelect', { static: false }) projectSelect: IonSelect;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
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
    this.challenges.push("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
    this.challenges.push("Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.");
    this.challenges.push("The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.");
  }

  competenciesSetUp() {
    this.competencies.push({
      id: 1,
      text: 'Competencia 1',
      points: 2
    });
    this.competencies.push({
      id: 2,
      text: 'Competencia 2',
      points: 3
    });
    this.competencies.push({
      id: 3,
      text: 'Competencia 3',
      points: 4
    });
    this.competencies.push({
      id: 4,
      text: 'Competencia 4',
      points: 2
    });
    this.competencies.push({
      id: 5,
      text: 'Competencia 5',
      points: 1
    });
    this.competencies.push({
      id: 6,
      text: 'Competencia 6',
      points: 2
    });
    this.competencies.push({
      id: 7,
      text: 'Competencia 7',
      points: 1
    });
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
    console.log('dicesNumber: ', dicesNumber);
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
    this.updateScore();
    this.cleanFields();
    if (!this.gameIsFinished()) this.goToNextChallenge()
    else this.showGameScores();
  }

  registerAnswer() {
    console.log('TO-DO: REGISTER ANSWER IN REDIS');
  }

  updateScore() {
    this.score += this.dicesSum - this.challengeDifficulty;
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

  cleanFields() {
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

  showGameScores() {
    this.navCtrl.navigateForward(['role-playing/scores']);
  }
}
