import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {

  public participantScores: any = [];

  constructor() { }

  ngOnInit() {
    this.getParticipantScores();
  }

  getParticipantScores() {
    this.participantScores = [{
      name: 'Marcelo',
      score: 27
    },
    {
      name: 'Marcelo',
      score: 26
    },
    {
      name: 'Marcelo',
      score: 25
    }]
  }


}
