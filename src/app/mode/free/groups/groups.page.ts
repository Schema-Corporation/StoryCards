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
    title: "Emociones",
    imgLocation: '/assets/cards/emotions/emociones_12_im.svg',
    cardImgArray: [
      {
        id: 1,
        imgCard: '/assets/cards/emotions/emociones_01_im.svg',
        imgRotate: true
      },
      {
        id: 2,
        imgCard: '/assets/cards/emotions/emociones_02_im.svg',
        imgRotate: true
      },
      {
        id: 3,
        imgCard: '/assets/cards/emotions/emociones_03_im.svg',
        imgRotate: true
      },
      {
        id: 4,
        imgCard: '/assets/cards/emotions/emociones_04_im.svg',
        imgRotate: true
      },
      {
        id: 5,
        imgCard: '/assets/cards/emotions/emociones_05_im.svg',
        imgRotate: true
      },
      {
        id: 6,
        imgCard: '/assets/cards/emotions/emociones_06_im.svg',
        imgRotate: true
      },
      {
        id: 7,
        imgCard: '/assets/cards/emotions/emociones_07_im.svg',
        imgRotate: true
      },
      {
        id: 8,
        imgCard: '/assets/cards/emotions/emociones_08_im.svg',
        imgRotate: true
      },
      {
        id: 9,
        imgCard: '/assets/cards/emotions/emociones_09_im.svg',
        imgRotate: true
      },
      {
        id: 10,
        imgCard: '/assets/cards/emotions/emociones_10_im.svg',
        imgRotate: true
      },
      {
        id: 11,
        imgCard: '/assets/cards/emotions/emociones_11_im.svg',
        imgRotate: true
      },
      {
        id: 12,
        imgCard: '/assets/cards/random/aleatoria_01_im.svg',
        imgRotate: true
      }
    ]
  }
  group2: IGroup  = {
    id: 2,
    title: "Trama",
    imgLocation: '/assets/cards/plot/trama_04_im.svg',
    cardImgArray: [
      {
        id: 1,
        imgCard: '/assets/cards/plot/trama_01_im.svg'
      },
      {
        id: 2,
        imgCard: '/assets/cards/plot/trama_02_im.svg'
      },
      {
        id: 3,
        imgCard: '/assets/cards/plot/trama_03_im.svg'
      },
      {
        id: 4,
        imgCard: '/assets/cards/random/aleatoria_01_im.svg'
      }
    ]
  }
  group3: IGroup  = {
    id: 3,
    title: "Género",
    imgLocation: '/assets/cards/genres/genero_06_im.svg',
    cardImgArray: [
      {
        id: 1,
        imgCard: '/assets/cards/genres/genero_01_im.svg'
      },
      {
        id: 2,
        imgCard: '/assets/cards/genres/genero_02_im.svg'
      },
      {
        id: 3,
        imgCard: '/assets/cards/genres/genero_03_im.svg'
      },
      {
        id: 4,
        imgCard: '/assets/cards/genres/genero_04_im.svg'
      },
      {
        id: 5,
        imgCard: '/assets/cards/genres/genero_05_im.svg'
      },
      {
        id: 6,
        imgCard: '/assets/cards/random/aleatoria_01_im.svg'
      }
    ]
  }
  group4: IGroup  = {
    id: 4,
    title: "Mitos",
    imgLocation: '/assets/cards/myths/mitos_04_im.svg',
    cardImgArray: [
      {
        id: 1,
        imgCard: '/assets/cards/myths/mitos_01_im.svg'
      },
      {
        id: 2,
        imgCard: '/assets/cards/myths/mitos_02_im.svg'
      },
      {
        id: 3,
        imgCard: '/assets/cards/myths/mitos_03_im.svg'
      },
      {
        id: 4,
        imgCard: '/assets/cards/random/aleatoria_01_im.svg'
      }
    ]
  }
  group5: IGroup  = {
    id: 5,
    title: "Tema",
    imgLocation: '/assets/cards/topic/tema_13_im.svg',
    cardImgArray: [
      {
        id: 1,
        imgCard: '/assets/cards/topic/tema_01_im.svg'
      },
      {
        id: 2,
        imgCard: '/assets/cards/topic/tema_02_im.svg'
      },
      {
        id: 3,
        imgCard: '/assets/cards/topic/tema_03_im.svg'
      },
      {
        id: 4,
        imgCard: '/assets/cards/topic/tema_04_im.svg'
      },
      {
        id: 5,
        imgCard: '/assets/cards/topic/tema_05_im.svg'
      },
      {
        id: 6,
        imgCard: '/assets/cards/topic/tema_06_im.svg'
      },
      {
        id: 7,
        imgCard: '/assets/cards/topic/tema_07_im.svg'
      },
      {
        id: 8,
        imgCard: '/assets/cards/topic/tema_08_im.svg'
      },
      {
        id: 9,
        imgCard: '/assets/cards/topic/tema_09_im.svg'
      },
      {
        id: 10,
        imgCard: '/assets/cards/topic/tema_10_im.svg'
      },
      {
        id: 11,
        imgCard: '/assets/cards/topic/tema_11_im.svg'
      },
      {
        id: 12,
        imgCard: '/assets/cards/topic/tema_12_im.svg'
      },
      {
        id: 13,
        imgCard: '/assets/cards/random/aleatoria_01_im.svg'
      }
    ]
  }
  group6: IGroup  = {
    id: 6,
    title: "Procesos",
    imgLocation: '/assets/cards/processes/procesos_08_im.svg',
    cardImgArray: [
      {
        id: 1,
        imgCard: '/assets/cards/processes/procesos_01_im.svg'
      },
      {
        id: 2,
        imgCard: '/assets/cards/processes/procesos_02_im.svg'
      },
      {
        id: 3,
        imgCard: '/assets/cards/processes/procesos_03_im.svg'
      },
      {
        id: 4,
        imgCard: '/assets/cards/processes/procesos_04_im.svg'
      },
      {
        id: 5,
        imgCard: '/assets/cards/processes/procesos_05_im.svg'
      },
      {
        id: 6,
        imgCard: '/assets/cards/processes/procesos_06_im.svg'
      },
      {
        id: 7,
        imgCard: '/assets/cards/processes/procesos_07_im.svg'
      },
      {
        id: 8,
        imgCard: '/assets/cards/sequence/sequence_01_im.svg'
      }
    ]
  }
  group7: IGroup  = {
    id: 7,
    title: "Arquetipos",
    imgLocation: '/assets/cards/archetypes/arquetipos_25_im.svg',
    cardImgArray: [
      {
        id: 1,
        imgCard: '/assets/cards/archetypes/arquetipos_02_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_01_im.svg'
      },
      {
        id: 2,
        imgCard: '/assets/cards/archetypes/arquetipos_04_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_03_im.svg'
      },
      {
        id: 3,
        imgCard: '/assets/cards/archetypes/arquetipos_06_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_05_im.svg'
      },
      {
        id: 4,
        imgCard: '/assets/cards/archetypes/arquetipos_08_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_07_im.svg'
      },
      {
        id: 5,
        imgCard: '/assets/cards/archetypes/arquetipos_10_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_09_im.svg'
      },
      {
        id: 6,
        imgCard: '/assets/cards/archetypes/arquetipos_12_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_11_im.svg'
      },
      {
        id: 7,
        imgCard: '/assets/cards/archetypes/arquetipos_14_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_13_im.svg'
      },
      {
        id: 8,
        imgCard: '/assets/cards/archetypes/arquetipos_16_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_15_im.svg'
      },
      {
        id: 9,
        imgCard: '/assets/cards/archetypes/arquetipos_18_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_17_im.svg'
      },
      {
        id: 10,
        imgCard: '/assets/cards/archetypes/arquetipos_20_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_19_im.svg'
      },
      {
        id: 11,
        imgCard: '/assets/cards/archetypes/arquetipos_22_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_21_im.svg'
      },
      {
        id: 12,
        imgCard: '/assets/cards/archetypes/arquetipos_24_im.svg',
        imgDescription: '/assets/cards/archetypes/arquetipos_23_im.svg'
      },
      {
        id: 13,
        imgCard: '/assets/cards/random/aleatoria_01_im.svg'
      }
    ]
  }
  group8: IGroup  = {
    id: 8,
    title: "Recursos",
    imgLocation: '/assets/cards/resources/recursos_13_im.svg',
    cardImgArray: [
      {
        id: 1,
        imgCard: '/assets/cards/resources/recursos_02_im.svg',
        imgDescription: '/assets/cards/resources/recursos_01_im.svg'
      },
      {
        id: 2,
        imgCard: '/assets/cards/resources/recursos_04_im.svg',
        imgDescription: '/assets/cards/resources/recursos_03_im.svg'
      },
      {
        id: 3,
        imgCard: '/assets/cards/resources/recursos_06_im.svg',
        imgDescription: '/assets/cards/resources/recursos_05_im.svg'
      },
      {
        id: 4,
        imgCard: '/assets/cards/resources/recursos_08_im.svg',
        imgDescription: '/assets/cards/resources/recursos_07_im.svg'
      },
      {
        id: 5,
        imgCard: '/assets/cards/resources/recursos_10_im.svg',
        imgDescription: '/assets/cards/resources/recursos_09_im.svg'
      },
      {
        id: 6,
        imgCard: '/assets/cards/resources/recursos_12_im.svg',
        imgDescription: '/assets/cards/resources/recursos_11_im.svg'
      },
      {
        id: 7,
        imgCard: '/assets/cards/random/aleatoria_01_im.svg'
      }
    ]
  }

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
      

  }

  showCards(id, cards, title){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          id: id,
          cards: JSON.stringify(cards),
          title: title
      }
    }
    this.navCtrl.navigateForward(['free/cards'], navigationExtras);
  }
  


}
