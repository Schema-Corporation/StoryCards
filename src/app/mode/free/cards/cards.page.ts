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

  card1: ICards = {
    id: 1,
    imgCard: '/assets/icon/favicon.png',
    imgDescription: 'description 1'
  }
  card2: ICards = {
    id: 2,
    imgCard: '/assets/icon/favicon.png',
    imgDescription: 'description 2'
  }
  card3: ICards = {
    id: 3,
    imgCard: '/assets/icon/favicon.png',
    imgDescription: 'description 3'
  }
  card4: ICards = {
    id: 4,
    imgCard: '/assets/icon/favicon.png',
    imgDescription: 'description 4'
  }
  card5: ICards = {
    id: 5,
    imgCard: '/assets/icon/favicon.png',
    imgDescription: 'description 5'
  }
  card6: ICards = {
    id: 6,
    imgCard: '/assets/icon/favicon.png',
    imgDescription: 'description 6'
  }
  card7: ICards = {
    id: 7,
    imgCard: '/assets/icon/favicon.png',
    imgDescription: 'description 7'
  }
  card8: ICards = {
    id: 8,
    imgCard: '/assets/icon/favicon.png',
    imgDescription: 'description 8'
  }
  card9: ICards = {
    id: 9,
    imgCard: '/assets/icon/favicon.png',
    imgDescription: 'description 9'
  }
  public id: any;
  public cards: any;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params["id"];
      this.cards = JSON.parse(params["cards"]);
      console.log(this.cards)
  });
    this.location.replaceState('/free/cards')
  }

  showDetail(card){
    let idCard = card.id
    let navigationExtras: NavigationExtras = {
      queryParams: {
          
          card: card.imgCard,
          description: card.imgDescription
      }
  
    }
    this.navCtrl.navigateForward(['free/detail/:idCard'], navigationExtras);

  }

}
