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
    imgCard: '/assets/cards/archetypes/arquetipos_02_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_01_im.png'
  }
  card2: ICards = {
    id: 2,
    imgCard: '/assets/cards/archetypes/arquetipos_04_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_03_im.png'
  }
  card3: ICards = {
    id: 3,
    imgCard: '/assets/cards/archetypes/arquetipos_06_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_05_im.png'
  }
  card4: ICards = {
    id: 4,
    imgCard: '/assets/cards/archetypes/arquetipos_08_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_07_im.png'
  }
  card5: ICards = {
    id: 5,
    imgCard: '/assets/cards/archetypes/arquetipos_10_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_09_im.png'
  }
  card6: ICards = {
    id: 6,
    imgCard: '/assets/cards/archetypes/arquetipos_12_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_11_im.png'
  }
  card7: ICards = {
    id: 7,
    imgCard: '/assets/cards/archetypes/arquetipos_14_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_13_im.png'
  }
  card8: ICards = {
    id: 8,
    imgCard: '/assets/cards/archetypes/arquetipos_16_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_15_im.png'
  }
  card9: ICards = {
    id: 9,
    imgCard: '/assets/cards/archetypes/arquetipos_18_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_17_im.png'
  }
  card10: ICards = {
    id: 10,
    imgCard: '/assets/cards/archetypes/arquetipos_20_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_19_im.png'
  }
  card11: ICards = {
    id: 11,
    imgCard: '/assets/cards/archetypes/arquetipos_22_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_21_im.png'
  }
  card12: ICards = {
    id: 12,
    imgCard: '/assets/cards/archetypes/arquetipos_24_im.png',
    imgDescription: '/assets/cards/archetypes/arquetipos_23_im.png'
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
