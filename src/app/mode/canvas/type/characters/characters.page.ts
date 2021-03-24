import { Component, OnInit } from '@angular/core';
import { IGroup } from 'src/common/types/groups';
import { NavController, ToastController, Platform, AlertController } from '@ionic/angular';
import { OcFileStorageService } from 'src/app/util/OcFileStorageService';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  public id: any;
  public cards: any;
  public title: any;
  public rows: any;
  public columns: any;
  public showGroupCards: boolean = true;
  public showDivCards: boolean = false;
  public showInfoCards: boolean = false;
  public cardSelected: number = -1;
  public principalCharacter1: number = -1;
  public principalCharacter2: number = -1;
  public secondaryCharacter1: number = -1;
  public secondaryCharacter2: number = -1;
  public maximumCharactersAllowed: number = 80;
  public maximumCharactersAllowed300: number = 300;
  public characteristics: string = "";
  public characteristicsCharacters: number = 0;
  public principalCharacter1Characteristics: string = "";
  public principalCharacter1CharacteristicsCharacters: number = 0;
  public principalCharacter2Characteristics: string = "";
  public principalCharacter2CharacteristicsCharacters: number = 0;
  public secondaryCharacter1Characteristics: string = "";
  public secondaryCharacter1CharacteristicsCharacters: number = 0;
  public secondaryCharacter2Characteristics: string = "";
  public secondaryCharacter2CharacteristicsCharacters: number = 0;
  public motivation: string = "";
  public motivationCharacters: number = 0;
  public principalCharacter1Motivation: string = "";
  public principalCharacter1MotivationCharacters: number = 0;
  public principalCharacter2Motivation: string = "";
  public principalCharacter2MotivationCharacters: number = 0;
  public secondaryCharacter1Motivation: string = "";
  public secondaryCharacter1MotivationCharacters: number = 0;
  public secondaryCharacter2Motivation: string = "";
  public secondaryCharacter2MotivationCharacters: number = 0;
  public pdfObject = null;
  public isPrint: boolean = false;

  public isEdit: boolean = false;
  public canvasBody: any;
  public canvasData: any;
  public data: any = null;
  public name: string = "";
  public canvasId: string = "";

  public role: number;
  public showSaveOption: boolean;

  group1: IGroup = {
    id: 1,
    title: "Personaje principal 1",
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
      }
    ]
  }
  group2: IGroup = {
    id: 1,
    title: "Personaje principal 2",
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
      }
    ]
  }
  group3: IGroup = {
    id: 1,
    title: "Personaje secundario 1",
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
      }
    ]
  }
  group4: IGroup = {
    id: 1,
    title: "Personaje secundario 2",
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
      }
    ]
  }

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public ocFileStorageSvc: OcFileStorageService,
    public toastController: ToastController,
    public platform: Platform,
    public dbService: NgxIndexedDBService,
    public _canvasService: CanvasService,
    public _loginService: LoginService,
    public route: ActivatedRoute) { }

  ngOnInit() { 
    this.cards = this.group1.cardImgArray;
    this.route.queryParams.subscribe(params => {
      if (params["data"] === undefined) {
        this.isEdit = false;
      } else {
        this.data = JSON.parse(params["data"]);
        this.fillCanvasData(this.data);
        this.isEdit = true;
      }
    });

    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._loginService.validateRole(token.value.token).subscribe(role => {
          switch (role.role) {
            case 'HOST': this.role = 1; this.showSaveOption = true; break;
            case 'GUEST': this.role = 2; break;
            default: this.role = -1; break;
          }
        }, error => {
          console.log('error: ', error);
        })

      },
      error => {
        this.closeSession();
      });
  }

  fillCanvasData(data) {
    let canvasData = JSON.parse(data.data);
    let canvasBody = canvasData.body;

    // character 1
    this.principalCharacter1 = canvasBody.firstPrincipalCharacter.card;
    this.principalCharacter1Characteristics = canvasBody.firstPrincipalCharacter.characteristics;
    this.principalCharacter1CharacteristicsCharacters = this.principalCharacter1Characteristics.length;
    this.principalCharacter1Motivation = canvasBody.firstPrincipalCharacter.motivation;
    this.principalCharacter1MotivationCharacters = this.principalCharacter1Motivation.length;

    // character 2
    this.principalCharacter2 = canvasBody.secondPrincipalCharacter.card;
    this.principalCharacter2Characteristics = canvasBody.secondPrincipalCharacter.characteristics;
    this.principalCharacter2CharacteristicsCharacters = this.principalCharacter2Characteristics.length;
    this.principalCharacter2Motivation = canvasBody.secondPrincipalCharacter.motivation;
    this.principalCharacter2MotivationCharacters = this.principalCharacter2Motivation.length;

    // character 3
    this.secondaryCharacter1 = canvasBody.firstSecondaryCharacter.card;
    this.secondaryCharacter1Characteristics = canvasBody.firstSecondaryCharacter.characteristics;
    this.secondaryCharacter1CharacteristicsCharacters = this.secondaryCharacter1Characteristics.length;
    this.secondaryCharacter1Motivation = canvasBody.firstSecondaryCharacter.motivation;
    this.secondaryCharacter1MotivationCharacters = this.secondaryCharacter1Motivation.length;

    // character 4
    this.secondaryCharacter2 = canvasBody.secondSecondaryCharacter.card;
    this.secondaryCharacter2Characteristics = canvasBody.secondSecondaryCharacter.characteristics;
    this.secondaryCharacter2CharacteristicsCharacters = this.secondaryCharacter2Characteristics.length;
    this.secondaryCharacter2Motivation = canvasBody.secondSecondaryCharacter.motivation;
    this.secondaryCharacter2MotivationCharacters = this.secondaryCharacter2Motivation.length;

    // canvas data
    this.name = data.name;
    this.canvasId = data.id;
  }

  showCards(id, cards, title) {

    this.showGroupCards = false;

    var numberOfRows = Math.floor(cards.length / 3);
    var numberOfColumns = 3;
    this.rows = [];
    this.columns = [];
    this.id = id;
    this.title = title;
    this.cards = cards;
    for (var i = 0; i < numberOfRows; i++) {
      this.rows.push(i);
    }
    for (var i = 0; i < numberOfColumns; i++) {
      this.columns.push(i);
    }
    if (cards.length % 3 != 0) this.rows.push(numberOfRows);
    this.showDivCards = true;

    switch (this.title) {
      case 'Personaje principal 1': this.cardSelected = this.principalCharacter1; break;
      case 'Personaje principal 2': this.cardSelected = this.principalCharacter2; break;
      case 'Personaje secundario 1': this.cardSelected = this.secondaryCharacter1; break;
      case 'Personaje secundario 2': this.cardSelected = this.secondaryCharacter2; break;
      default: break;
    }


  }

  async chooseCanvasName() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Qué nombre llevará su formato?',
      inputs: [
        {
          name: 'canvasName',
          type: 'text',
          placeholder: 'Nombre de formato',
          value: this.name,
          attributes: {
            maxlength: 100
          }
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          handler: () => {
          }
        },
        {
          text:'Guardar',
          handler:(data) => {
            this.saveCanvas(data.canvasName);
          }
        }
      ]
    });

    await alert.present();

  }

  getCanvasData() {
    this.canvasData = {
      metadata: {
        numberSteps: 0
      },
      body: {
        firstPrincipalCharacter: {
          card: this.principalCharacter1,
          characteristics: this.principalCharacter1Characteristics,
          motivation: this.principalCharacter1Motivation
        },
        secondPrincipalCharacter: {
          card: this.principalCharacter2,
          characteristics: this.principalCharacter2Characteristics,
          motivation: this.principalCharacter2Motivation
        },
        firstSecondaryCharacter: {
          card: this.secondaryCharacter1,
          characteristics: this.secondaryCharacter1Characteristics,
          motivation: this.secondaryCharacter1Motivation
        },
        secondSecondaryCharacter: {
          card: this.secondaryCharacter2,
          characteristics: this.secondaryCharacter2Characteristics,
          motivation: this.secondaryCharacter2Motivation
        }
      }
    }
    return this.canvasData;
  }

  getCanvasBody(canvasName) {
    this.canvasBody = {
      name: canvasName,
      type: 3,
      data: JSON.stringify(this.getCanvasData())
    };

    return this.canvasBody;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async saveCanvas(canvasName) {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        if (this.isEdit) {
          this._canvasService.editCanvas(this.canvasId, this.getCanvasBody(canvasName), token.value.token).subscribe(
            async result => {
              this.presentToast('¡Su formato ha sido editado con éxito!');
              await this.sleep(2500);
              this.navCtrl.navigateForward('canvas/canvas');
            },
            error => {
              this.closeSession();
              console.log('error: ', error);
            }
          );
        } else {
          this._canvasService.createCanvas(this.getCanvasBody(canvasName), token.value.token).subscribe(
            async result => {
              this.presentToast('¡Su formato se ha guardado con éxito!');
              await this.sleep(2500);
              this.navCtrl.navigateForward('canvas/canvas');
            },
            error => {
              this.closeSession();
              console.log('error: ', error);
            }
          );
        }
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

  changeCard(cardSelected) {

    this.cardSelected = cardSelected;

    switch (this.title) {
      case 'Personaje principal 1':
        this.principalCharacter1 = this.cardSelected;
        this.characteristics = this.principalCharacter1Characteristics;
        this.characteristicsCharacters = this.principalCharacter1Characteristics.length;
        this.motivation = this.principalCharacter1Motivation;
        this.motivationCharacters = this.principalCharacter1Motivation.length;
        break;
      case 'Personaje principal 2':
        this.principalCharacter2 = this.cardSelected;
        this.characteristics = this.principalCharacter2Characteristics;
        this.characteristicsCharacters = this.principalCharacter2Characteristics.length;
        this.motivation = this.principalCharacter2Motivation;
        this.motivationCharacters = this.principalCharacter2Motivation.length;
        break;
      case 'Personaje secundario 1':
        this.secondaryCharacter1 = this.cardSelected;
        this.characteristics = this.secondaryCharacter1Characteristics;
        this.characteristicsCharacters = this.secondaryCharacter1Characteristics.length;
        this.motivation = this.secondaryCharacter1Motivation;
        this.motivationCharacters = this.secondaryCharacter1Motivation.length;
        break;
      case 'Personaje secundario 2':
        this.secondaryCharacter2 = this.cardSelected;
        this.characteristics = this.secondaryCharacter2Characteristics;
        this.characteristicsCharacters = this.secondaryCharacter2Characteristics.length;
        this.motivation = this.secondaryCharacter2Motivation;
        this.motivationCharacters = this.secondaryCharacter2Motivation.length;
        break;
      default: break;
    }
    
    this.showInfoCards = true;
    this.showDivCards = false;
    
  }

  backGroup() {
    this.cardSelected = -1;
    this.characteristics = "";
    this.characteristicsCharacters = 0;
    this.motivation = "";
    this.motivationCharacters = 0;
    this.showGroupCards = true;
    this.showDivCards = false;
    this.showInfoCards = false;
  }

  backCards() {
    this.showDivCards = true;
    this.showInfoCards = false;
  }

  writeCharacteristics(ev: CustomEvent) {
    this.characteristics = ev.detail.value;
    this.characteristicsCharacters = ev.detail.value.length;

    switch (this.title) {
      case 'Personaje principal 1':
        this.principalCharacter1Characteristics = this.characteristics;
        this.principalCharacter1CharacteristicsCharacters = this.characteristicsCharacters;
        break;
      case 'Personaje principal 2':
        this.principalCharacter2Characteristics = this.characteristics;
        this.principalCharacter2CharacteristicsCharacters = this.characteristicsCharacters;
        break;
      case 'Personaje secundario 1':
        this.secondaryCharacter1Characteristics = this.characteristics;
        this.secondaryCharacter1CharacteristicsCharacters = this.characteristicsCharacters;
        break;
      case 'Personaje secundario 2':
        this.secondaryCharacter2Characteristics = this.characteristics;
        this.secondaryCharacter2CharacteristicsCharacters = this.characteristicsCharacters;
        break;
    }
  }

  writeMotivation(ev: CustomEvent) {
    this.motivation = ev.detail.value;
    this.motivationCharacters = ev.detail.value.length;

    switch (this.title) {
      case 'Personaje principal 1':
        this.principalCharacter1Motivation = this.motivation;
        this.principalCharacter1MotivationCharacters = this.motivationCharacters;
        break;
      case 'Personaje principal 2':
        this.principalCharacter2Motivation = this.motivation;
        this.principalCharacter2MotivationCharacters = this.motivationCharacters;
        break;
      case 'Personaje secundario 1':
        this.secondaryCharacter1Motivation = this.motivation;
        this.secondaryCharacter1MotivationCharacters = this.motivationCharacters;
        break;
      case 'Personaje secundario 2':
        this.secondaryCharacter2Motivation = this.motivation;
        this.secondaryCharacter2MotivationCharacters = this.motivationCharacters;
        break;
    }
  }

  async viewDetail() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-alert',
      header: 'Detalles',
      message: `<img src="${this.cards[this.cardSelected].imgDescription}" class="card-alert">`
    })

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async downloadCanvas() {
    this.isPrint = false;
    var base64ImageLogo = await this.getImage('/assets/icon/logo.png', '', '');
    if (this.principalCharacter1 == -1 && this.principalCharacter2 == -1 && this.secondaryCharacter1 == -1 && this.secondaryCharacter2 == -1) {
      this.generateHTML('', '', '', '', base64ImageLogo);
    } else {
      this.createPDF(
        this.principalCharacter1 != -1 ? this.cards[this.principalCharacter1].id * 2 : -1,
        this.principalCharacter2 != -1 ? this.cards[this.principalCharacter2].id * 2 : -1,
        this.secondaryCharacter1 != -1 ? this.cards[this.secondaryCharacter1].id * 2 : -1,
        this.secondaryCharacter2 != -1 ? this.cards[this.secondaryCharacter2].id * 2: -1,
        base64ImageLogo);
    }
  }

  async printCanvas() {

    this.isPrint = true;
    var base64ImageLogo = await this.getImage('/assets/icon/logo.png', '', '');
    if (this.principalCharacter1 == -1 && this.principalCharacter2 == -1 && this.secondaryCharacter1 == -1 && this.secondaryCharacter2 == -1) {
      this.generateHTML('', '', '', '', base64ImageLogo);
    } else {
      this.createPDF(
        this.principalCharacter1 != -1 ? this.cards[this.principalCharacter1].id * 2 : -1,
        this.principalCharacter2 != -1 ? this.cards[this.principalCharacter2].id * 2 : -1,
        this.secondaryCharacter1 != -1 ? this.cards[this.secondaryCharacter1].id * 2 : -1,
        this.secondaryCharacter2 != -1 ? this.cards[this.secondaryCharacter2].id * 2: -1,
        base64ImageLogo);
    }

    this.presentToast('Formato abierto para imprimir');
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }

  async createPDF(
    numberImagePrincipalCharacter1: number,
    numberImagePrincipalCharacter2: number,
    numberImageSecondaryCharacter1: number,
    numberImageSecondaryCharacter2: number,
    base64ImageLogo: string): Promise<any> {

    var baseURL = "";
    var typeImage = "";

    var base64DataPrincipalCharacter1 = '';
    var base64DataPrincipalCharacter2 = '';
    var base64DataSecondaryCharacter1 = '';
    var base64DataSecondaryCharacter2 = '';

    if (numberImagePrincipalCharacter1 > 9) {
      baseURL = '/assets/cards/archetypes/arquetipos_';
      typeImage = "_im.png";
      base64DataPrincipalCharacter1 = await this.getImage(baseURL, numberImagePrincipalCharacter1, typeImage);
    } else if (numberImagePrincipalCharacter1 != -1) {
      baseURL = '/assets/cards/archetypes/arquetipos_0';
      typeImage = "_im.png";
      base64DataPrincipalCharacter1 = await this.getImage(baseURL, numberImagePrincipalCharacter1, typeImage);
    }
    if (numberImagePrincipalCharacter2 > 9) {
      baseURL = '/assets/cards/archetypes/arquetipos_';
      typeImage = "_im.png";
      base64DataPrincipalCharacter2 = await this.getImage(baseURL, numberImagePrincipalCharacter2, typeImage);
    } else if (numberImagePrincipalCharacter2 != -1) {
      baseURL = '/assets/cards/archetypes/arquetipos_0';
      typeImage = "_im.png";
      base64DataPrincipalCharacter2 = await this.getImage(baseURL, numberImagePrincipalCharacter2, typeImage);
    }

    if (numberImageSecondaryCharacter1 > 9) {
      baseURL = '/assets/cards/archetypes/arquetipos_';
      typeImage = "_im.png";
      base64DataSecondaryCharacter1 = await this.getImage(baseURL, numberImageSecondaryCharacter1, typeImage);
    } else if (numberImageSecondaryCharacter1 != -1) {
      baseURL = '/assets/cards/archetypes/arquetipos_0';
      typeImage = "_im.png";
      base64DataSecondaryCharacter1 = await this.getImage(baseURL, numberImageSecondaryCharacter1, typeImage);
    }

    if (numberImageSecondaryCharacter2 > 9) {
      baseURL = '/assets/cards/archetypes/arquetipos_';
      typeImage = "_im.png";
      base64DataSecondaryCharacter2 = await this.getImage(baseURL, numberImageSecondaryCharacter2, typeImage);
    } else if (numberImageSecondaryCharacter2 != -1) {
      baseURL = '/assets/cards/archetypes/arquetipos_0';
      typeImage = "_im.png";
      base64DataSecondaryCharacter2 = await this.getImage(baseURL, numberImageSecondaryCharacter2, typeImage);
    }

    this.generateHTML(base64DataPrincipalCharacter1, base64DataPrincipalCharacter2, base64DataSecondaryCharacter1, base64DataSecondaryCharacter2, base64ImageLogo);

  }

  getImage(baseURL, numberImage, typeImage): Promise<string> {
    // Get data from subscriber and pass to image src
    return this.ocFileStorageSvc
      .getImageFromURL(baseURL + numberImage + typeImage).toPromise();
  }

  generateHTML(
    base64DataPrincipalCharacter1: string,
    base64DataPrincipalCharacter2: string,
    base64DataSecondaryCharacter1: string,
    base64DataSecondaryCharacter2: string,
    base64ImageLogo: string) {

    var docDefinition = {
      pageSize: {
        width: 650,
        height: 'auto'
      },
      content: [
        this.getHTML(
          base64DataPrincipalCharacter1,
          base64DataPrincipalCharacter2,
          base64DataSecondaryCharacter1,
          base64DataSecondaryCharacter2,
          base64ImageLogo
        )
      ]
    };

    this.pdfObject = pdfMake.createPdf(docDefinition);

    if (!this.isPrint){
      // This method suportted web and device platform
      this.pdfObject.download('Formato_Personajes.pdf');
      this.presentToast('Formato descargado');
    } else {
      this.pdfObject.open();
    }

  }

  getHTML(
    base64DataPrincipalCharacter1: string,
    base64DataPrincipalCharacter2: string,
    base64DataSecondaryCharacter1: string,
    base64DataSecondaryCharacter2: string,
    base64ImageLogo) {

    var imagePrincipalCharacter1 = '';
    var imagePrincipalCharacter2 = '';
    var imageSecondaryCharacter1 = '';
    var imageSecondaryCharacter2 = '';

    if (base64DataPrincipalCharacter1 != '') {
      imagePrincipalCharacter1 =
        `<br>
        <img src="${base64DataPrincipalCharacter1}" alt="Emotion" width="250" height="400">
      <br>`
    } else {
      imagePrincipalCharacter1 =
        `<br>
       <br>`
    }

    if (base64DataPrincipalCharacter2 != '') {
      imagePrincipalCharacter2 =
        `<br>
        <img src="${base64DataPrincipalCharacter2}" alt="Emotion" width="250" height="400">
      <br>`
    } else {
      imagePrincipalCharacter2 =
        `<br>
       <br>`
    }

    if (base64DataSecondaryCharacter1 != '') {
      imageSecondaryCharacter1 =
        `<br>
        <img src="${base64DataSecondaryCharacter1}" alt="Emotion" width="250" height="400">
      <br>`
    } else {
      imageSecondaryCharacter1 =
        `<br>
       <br>`
    }


    if (base64DataSecondaryCharacter2 != '') {
      imageSecondaryCharacter2 =
        `<br>
        <img src="${base64DataSecondaryCharacter2}" alt="Emotion" width="250" height="400">
      <br>`
    } else {
      imageSecondaryCharacter2 =
        `<br>
       <br>`
    }

    var html = htmlToPdfmake(`
    <img src="${base64ImageLogo}" width="250" height="75" style="opacity: 0.4; margin-left: 500px; margin-bottom: 10px;">
    <table border="1" cellspacing="0" cellpadding="0" width="645">
      <tbody>
          <tr>
              <td style="width:655px;" colspan="2" valign="top">
                  <p style="text-align:center">
                    Personajes principales
                  </p>
              </td>
          </tr>
          <tr>`
      +
      `<td width="330" style="text-align:center" valign="top">
                ${imagePrincipalCharacter1}
              </td>` +

      `<td width="330" style="text-align:center" valign="top">
                ${imagePrincipalCharacter2}
              </td>` +
      `</tr>
          <tr>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                      Características escogidas:
                  </p>
                  <p style="text-align:center">
                      ${this.principalCharacter1Characteristics}
                  </p>
              </td>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                    Características escogidas:
                  </p>
                  <p style="text-align:center">
                      ${this.principalCharacter2Characteristics}
                  </p>
              </td>
          </tr>
          <tr>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                      Motivaciones:
                  </p>
                  <p style="text-align:center">
                      ${this.principalCharacter1Motivation}
                  </p>
              </td>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                    Motivaciones:
                  </p>
                  <p style="text-align:center">
                      ${this.principalCharacter2Motivation}
                  </p>
              </td>
          </tr>
          <tr>
              <td width="645" colspan="2" valign="top">
                  <p style="text-align:center">
                    Personajes secundarios
                  </p>
              </td>
          </tr>
          <tr>`
      +
      `<td width="323" style="text-align:center" valign="top">
                ${imageSecondaryCharacter1}
              </td>` +

      `<td width="323" style="text-align:center" valign="top">
              ${imageSecondaryCharacter2}
            </td>` +
      `</tr>
          <tr>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                      Características escogidas:
                  </p>
                  <p style="text-align:center">
                      ${this.secondaryCharacter1Characteristics}
                  </p>
              </td>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                    Características escogidas:
                  </p>
                  <p style="text-align:center">
                      ${this.secondaryCharacter2Characteristics}
                  </p>
              </td>
          </tr>
          <tr>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                      Motivaciones:
                  </p>
                  <p style="text-align:center">
                      ${this.secondaryCharacter1Motivation}
                  </p>
              </td>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                    Motivaciones:
                  </p>
                  <p style="text-align:center">
                      ${this.secondaryCharacter2Motivation}
                  </p>
              </td>
          </tr>
      </tbody>
  </table>
    `, {
      tableAutoSize: true
    });
    return html;
  }
}
