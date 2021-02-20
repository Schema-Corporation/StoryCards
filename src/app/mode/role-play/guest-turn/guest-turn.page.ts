import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-turn',
  templateUrl: './guest-turn.page.html',
  styleUrls: ['./guest-turn.page.scss'],
})
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

  public showRollDiceModel: boolean = false;

  constructor() { }

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
      text: 'Competencia 1',
      points: 2
    });
    this.competencies.push({
      text: 'Competencia 2',
      points: 3
    });
    this.competencies.push({
      text: 'Competencia 3',
      points: 4
    });
    this.competencies.push({
      text: 'Competencia 4',
      points: 2
    });
    this.competencies.push({
      text: 'Competencia 5',
      points: 1
    });
    this.competencies.push({
      text: 'Competencia 6',
      points: 2
    });
    this.competencies.push({
      text: 'Competencia 7',
      points: 1
    });
  }

  writeAnswer(ev: CustomEvent) {
    this.answer = ev.detail.value;
    this.answerCharacters = ev.detail.value.length;
  }

  enoughData(): boolean {
    return false;
  }

  rollDice() {
    
    this.showRollDiceModel = true;
  }

}
