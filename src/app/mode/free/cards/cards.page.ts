import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Location } from "@angular/common";
import { ICards } from 'src/common/types/card';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  public rows: any;
  public columns: any;
  public id: any;
  public cards: any;
  public title: any;
  public rotated: number;
  public process: number;
  public showDivCards: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params["id"];
      this.cards = JSON.parse(params["cards"]);
      this.title = params["title"];
    });
    this.showCards(this.cards);
    this.location.replaceState('/free/cards')
  }

  showCards(cards) {
    var numberOfRows = Math.floor(cards.length / 3);
    var numberOfColumns = 3;
    this.rows = [];
    this.columns = [];
    for (var i = 0; i < numberOfRows; i++) {
      this.rows.push(i);
    }
    for (var i = 0; i < numberOfColumns; i++) {
      this.columns.push(i);
    }
    if (cards.length % 3 != 0) this.rows.push(numberOfRows);
    this.showDivCards = true;
  }

  goToDetailPage(card, cards) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          card: card.imgCard,
          description: card.imgDescription,
          rotate: card.imgRotate,
          rotated: this.rotated,
          process: this.process,
          cards: JSON.stringify(cards)
      }
    }
    this.navCtrl.navigateForward(['free/detail'], navigationExtras);
  }

  showDetail(card, cards){
    if (card.id == this.cards[this.cards.length - 1].id) {
      let maxNumber = this.cards.length - 1;
      let minNumber = 0;

      if (card.imgRotate) {
        if (Math.random() < 0.5)
          this.rotated = 0;
        else 
          this.rotated = 1;
      }
      card = this.cards[Math.floor(Math.random() * (maxNumber - minNumber) + minNumber)];
      if (this.id == 6) // case of process
      { 
        this.process = 1; 
      } else {
        this.process = 0;
      }
      this.goToDetailPage(card, cards);

    } else {

      this.rotated = 0;
      this.process = 0;
      this.goToDetailPage(card, null);
    }
  }

}
