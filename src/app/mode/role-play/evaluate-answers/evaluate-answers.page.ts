import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnswerService } from 'src/app/services/answer/answer.service';

@Component({
  selector: 'app-evaluate-answers',
  templateUrl: './evaluate-answers.page.html',
  styleUrls: ['./evaluate-answers.page.scss'],
})
export class EvaluateAnswersPage implements OnInit {

  public gameId: any;
  public numParticipants: number;
  public answers: any;
  public challenges: any;
  public challengeNumber: number = 0;
  public showChallenges: boolean = false;

  constructor(public route: ActivatedRoute,
    public dbService: NgxIndexedDBService,
    public navCtrl: NavController,
    public _answerServices: AnswerService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = params["gameId"];
      this.numParticipants = params["numParticipants"];
      this.dbService.getByIndex('variables', 'name', 'token').subscribe(
        token => {
          this._answerServices.openAnswersListWebSocket(this.gameId, token.value.token);
          this.getChallenges(this.gameId, token.value.token);
        },
        error => {
          this.closeSession();
          console.log('error: ', error);
      });
    });
  }

  diminishExtraPoints(answerId) {
    var answer = this._answerServices.answersList.filter(x => x.answerId == answerId)[0];
    if (answer.extraPoints > -20) {
      answer.extraPoints = answer.extraPoints - 5;
    }
  }

  increaseExtraPoints(answerId) {
    var answer = this._answerServices.answersList.filter(x => x.answerId == answerId)[0];
    if (answer.extraPoints < 20) {
      answer.extraPoints = answer.extraPoints + 5;
    }
  }

  answerListForChallenge(challengeId) {
    return this._answerServices.answersList.filter(x => x.challengeId == challengeId)
  }

  getChallengeId() {
    return this.challenges[this.challengeNumber].challengeId;
  }

  doEvaluateAnswer(answerId, answerExtraPoints) {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        const evaluateBody = {
          extraPoints: answerExtraPoints,
          evaluated: true
        }
        this._answerServices.giveExtraPoints(this.getChallengeId(), answerId, evaluateBody, token.value.token).subscribe(
          answerEvaluated => {
            this.updateAnswerInList(answerId);
          }, error => {
            this.closeSession();
            console.log('error: ', error);
          }
        );
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
    });
  }

  updateAnswerInList(answerId) {
    this._answerServices.answersList = this._answerServices.answersList.filter(x => x.answerId != answerId)
  }

  getChallenges(gameId, token) {
    this._answerServices.getChallenges(gameId, token).subscribe(
      challenges => {
        console.log('challenges: ', challenges);
        this.challenges = challenges;
        this.showChallenges = true;
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
    });
  }

  ngOnDestroy() {
    this._answerServices.closeWebSockets();
  }

  endGame() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._answerServices.finishGame(this.gameId, token.value.token).subscribe(finish => {
          this.goToScoresPage(this.gameId);
        });
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
    });
  }

  goToScoresPage(gameId: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        gameId: gameId
      }
    }
    this.navCtrl.navigateForward('role-playing/scores', navigationExtras);
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }

}
