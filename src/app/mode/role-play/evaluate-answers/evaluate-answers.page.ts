import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(public route: ActivatedRoute,
    public dbService: NgxIndexedDBService,
    public navCtrl: NavController,
    public _answerServices: AnswerService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = params["gameId"];
      this.numParticipants = params["numParticipants"];
      this.getAnswers(this.gameId);
      this.dbService.getByIndex('variables', 'name', 'token').subscribe(
        token => {
          this._answerServices.openAnswersListWebSocket(this.gameId, token.value.token);
        },
        error => {
          this.closeSession();
          console.log('error: ', error);
        });
    });
  }

  ngOnDestroy() {
    this._answerServices.closeWebSockets();
  }

  getAnswers(id: any) {
    console.log('DELETE THIS FUNCTION');
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }

}
