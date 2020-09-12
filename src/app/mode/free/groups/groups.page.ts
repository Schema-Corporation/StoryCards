import { Component, OnInit } from '@angular/core';
import { IGroup } from 'src/common/types/groups';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  
  group1: IGroup = {
    id: 1,
    imgLocation: '/assets/cards/emotions/emociones_12_im.png',
    cardImgArray: [{id: 1,
    imgCard: 'a'}]
  }
  group2: IGroup  = {
    id: 2,
    imgLocation: '/assets/cards/plot/Trama_04_im.png',
    cardImgArray: [{id: 2,
      imgCard: 'a'}]
  }
  group3: IGroup  = {
    id: 3,
    imgLocation: '/assets/cards/genres/genero_06_im.png',
    cardImgArray: [{id: 3,
      imgCard: 'a'}]
  }
  group4: IGroup  = {
    id: 4,
    imgLocation: '/assets/cards/myths/mitos_04_im.png',
    cardImgArray: [{id: 4,
      imgCard: 'a'}]
  }
  group5: IGroup  = {
    id: 5,
    imgLocation: '/assets/cards/topic/Tema_13_im.png',
    cardImgArray: [{id: 5,
      imgCard: 'a'}]
  }
  group6: IGroup  = {
    id: 6,
    imgLocation: '/assets/cards/processes/procesos_08_im.png',
    cardImgArray: [{id: 6,
      imgCard: 'a'}]
  }
  group7: IGroup  = {
    id: 7,
    imgLocation: '/assets/cards/archetypes/arquetipos_02_im.png',
    cardImgArray: [{id: 7,
      imgCard: 'a'}]
  }
  group8: IGroup  = {
    id: 8,
    imgLocation: '/assets/cards/resources/recursos_12_im.png',
    cardImgArray: [{id: 8,
      imgCard: 'a'}]
  }
  group9: IGroup  = {
    id: 9,
    imgLocation: '/assets/icon/favicon.png',
    cardImgArray: [{id: 9,
      imgCard: 'a'}]
  }
  
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
      

  }

  showCards(id, cards){

    let navigationExtras: NavigationExtras = {
      queryParams: {
          id: id,
          cards: JSON.stringify(cards)
      }
  
    }
    this.navCtrl.navigateForward(['free/cards/:id'], navigationExtras);

  }
  


}
