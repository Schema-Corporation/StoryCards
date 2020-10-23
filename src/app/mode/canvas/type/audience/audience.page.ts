import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.page.html',
  styleUrls: ['./audience.page.scss'],
})
export class AudiencePage implements OnInit {

  public rows: any;
  public columns: any;
  public cards: any;
  public step: number = 1;
  public emotion: number = -1;
  public showDivCards: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getEmotionsCards();
    this.showCards(this.cards);
  }

  getEmotionsCards() {
    this.cards = [{
      id: 1,
      imgCard: '/assets/cards/emotions/emociones_01_im.svg'
    },
    {
      id: 2,
      imgCard: '/assets/cards/emotions/emociones_02_im.svg'
    },
    {
      id: 3,
      imgCard: '/assets/cards/emotions/emociones_03_im.svg'
    },
    {
      id: 4,
      imgCard: '/assets/cards/emotions/emociones_04_im.svg'
    },
    {
      id: 5,
      imgCard: '/assets/cards/emotions/emociones_05_im.svg'
    },
    {
      id: 6,
      imgCard: '/assets/cards/emotions/emociones_06_im.svg'
    },
    {
      id: 7,
      imgCard: '/assets/cards/emotions/emociones_07_im.svg'
    },
    {
      id: 8,
      imgCard: '/assets/cards/emotions/emociones_08_im.svg'
    },
    {
      id: 9,
      imgCard: '/assets/cards/emotions/emociones_09_im.svg'
    },
    {
      id: 10,
      imgCard: '/assets/cards/emotions/emociones_10_im.svg'
    },
    {
      id: 11,
      imgCard: '/assets/cards/emotions/emociones_11_im.svg'
    }]
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

}
