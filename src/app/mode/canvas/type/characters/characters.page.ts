import { Component, OnInit } from '@angular/core';
import { IGroup } from 'src/common/types/groups';
import { NavController, ToastController, Platform, AlertController } from '@ionic/angular';
import { OcFileStorageService } from 'src/app/util/OcFileStorageService';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

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
  public secundaryCharacter1: number = -1;
  public secundaryCharacter2: number = -1;
  public maximumCharactersAllowed: number = 80;
  public characteristics: string = "";
  public characteristicsCharacters: number = 0;
  public principalCharacter1Characteristics: string = "";
  public principalCharacter1CharacteristicsCharacters: number = 0;
  public principalCharacter2Characteristics: string = "";
  public principalCharacter2CharacteristicsCharacters: number = 0;
  public secundaryCharacter1Characteristics: string = "";
  public secundaryCharacter1CharacteristicsCharacters: number = 0;
  public secundaryCharacter2Characteristics: string = "";
  public secundaryCharacter2CharacteristicsCharacters: number = 0;
  public motivation: string = "";
  public motivationCharacters: number = 0;
  public principalCharacter1Motivation: string = "";
  public principalCharacter1MotivationCharacters: number = 0;
  public principalCharacter2Motivation: string = "";
  public principalCharacter2MotivationCharacters: number = 0;
  public secundaryCharacter1Motivation: string = "";
  public secundaryCharacter1MotivationCharacters: number = 0;
  public secundaryCharacter2Motivation: string = "";
  public secundaryCharacter2MotivationCharacters: number = 0;
  private pdfObject = null;
  public isPrint: boolean = false;

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
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private ocFileStorageSvc: OcFileStorageService,
    public toastController: ToastController,
    public platform: Platform) { }

  ngOnInit() { }

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

  }

  changeCard(cardSelected) {

    this.cardSelected = cardSelected;

    switch (this.title) {
      case 'Personaje principal 1':
        this.principalCharacter1 = this.cardSelected;
        this.showInfoCards = true;
        this.showDivCards = false;
        console.log('card principal character 1 selected: ', this.principalCharacter1);
        break;
      case 'Personaje principal 2':
        this.principalCharacter2 = this.cardSelected;
        this.showInfoCards = true;
        this.showDivCards = false;
        console.log('card principal character 2 selected: ', this.principalCharacter2);
        break;
      case 'Personaje secundario 1':
        this.secundaryCharacter1 = this.cardSelected;
        this.showInfoCards = true;
        this.showDivCards = false;
        console.log('card secundary character 1 selected: ', this.secundaryCharacter1);
        break;
      case 'Personaje secundario 2':
        this.secundaryCharacter2 = this.cardSelected;
        this.showInfoCards = true;
        this.showDivCards = false;
        console.log('card secundary character 2 selected: ', this.secundaryCharacter2);
        break;
    }
  }

  backGroup() {
    this.cardSelected = -1;
    this.characteristics = "";
    this.characteristicsCharacters = 0;
    this.motivation = "";
    this.motivationCharacters = 0;
    this.showGroupCards = true;
    this.showDivCards = false;
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
        console.log('card principal character 1 selected: ', this.principalCharacter1);
        break;
      case 'Personaje principal 2':
        this.principalCharacter2Characteristics = this.characteristics;
        this.principalCharacter2CharacteristicsCharacters = this.characteristicsCharacters;
        console.log('card principal character 2 selected: ', this.principalCharacter2);
        break;
      case 'Personaje secundario 1':
        this.secundaryCharacter1Characteristics = this.characteristics;
        this.secundaryCharacter1CharacteristicsCharacters = this.characteristicsCharacters;
        console.log('card secundario character 1 selected: ', this.principalCharacter1);
        break;
      case 'Personaje secundario 2':
        this.secundaryCharacter2Characteristics = this.characteristics;
        this.secundaryCharacter2CharacteristicsCharacters = this.characteristicsCharacters;
        console.log('card secundario character 2 selected: ', this.principalCharacter2);
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
        console.log('card principal character 1 selected: ', this.principalCharacter1CharacteristicsCharacters);
        break;
      case 'Personaje principal 2':
        this.principalCharacter2Motivation = this.motivation;
        this.principalCharacter2MotivationCharacters = this.motivationCharacters;
        console.log('card principal character 2 selected: ', this.principalCharacter2Motivation);
        break;
      case 'Personaje secundario 1':
        this.secundaryCharacter1Motivation = this.motivation;
        this.secundaryCharacter1MotivationCharacters = this.motivationCharacters;
        console.log('card secundario character 1 selected: ', this.secundaryCharacter1Motivation);
        break;
      case 'Personaje secundario 2':
        this.secundaryCharacter2Motivation = this.motivation;
        this.secundaryCharacter2MotivationCharacters = this.motivationCharacters;
        console.log('card secundario character 2 selected: ', this.secundaryCharacter2Motivation);
        break;
    }
  }

  async finish() {
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

  downloadCanvas() {
    this.isPrint = false;

    if (this.principalCharacter1 == -1 && this.principalCharacter2 == -1 && this.secundaryCharacter1 == -1 && this.secundaryCharacter2 == -1) {
      this.generateHTML('', '', '', '');
    } else {
      this.createPDF(
        this.principalCharacter1 != -1 ? this.cards[this.principalCharacter1].id : -1,
        this.principalCharacter2 != -1 ? this.cards[this.principalCharacter2].id : -1,
        this.secundaryCharacter1 != -1 ? this.cards[this.secundaryCharacter1].id : -1,
        this.secundaryCharacter2 != -1 ? this.cards[this.secundaryCharacter2].id : -1);
    }
  }

  printCanvas() {

    this.isPrint = true;

    if (this.principalCharacter1 == -1 && this.principalCharacter2 == -1 && this.secundaryCharacter1 == -1 && this.secundaryCharacter2 == -1) {
      this.generateHTML('', '', '', '');
    } else {
      this.createPDF(
        this.principalCharacter1 != -1 ? this.cards[this.principalCharacter1].id : -1,
        this.principalCharacter2 != -1 ? this.cards[this.principalCharacter2].id : -1,
        this.secundaryCharacter1 != -1 ? this.cards[this.secundaryCharacter1].id : -1,
        this.secundaryCharacter2 != -1 ? this.cards[this.secundaryCharacter2].id : -1);
    }

    this.presentToast('Formato abierto para imprimir');
  }

  async createPDF(
    numberImagePrincipalCharacter1: number,
    numberImagePrincipalCharacter2: number,
    numberImageSecundaryCharacter1: number,
    numberImageSecundaryCharacter2: number): Promise<any> {

    var baseURL = "";
    var typeImage = "";

    var base64DataPrincipalCharacter1 = '';
    var base64DataPrincipalCharacter2 = '';
    var base64DataSecundaryCharacter1 = '';
    var base64DataSecundaryCharacter2 = '';

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

    if (numberImageSecundaryCharacter1 > 9) {
      baseURL = '/assets/cards/archetypes/arquetipos_';
      typeImage = "_im.png";
      base64DataSecundaryCharacter1 = await this.getImage(baseURL, numberImageSecundaryCharacter1, typeImage);
    } else if (numberImageSecundaryCharacter1 != -1) {
      baseURL = '/assets/cards/archetypes/arquetipos_0';
      typeImage = "_im.png";
      base64DataSecundaryCharacter1 = await this.getImage(baseURL, numberImageSecundaryCharacter1, typeImage);
    }

    if (numberImageSecundaryCharacter2 > 9) {
      baseURL = '/assets/cards/archetypes/arquetipos_';
      typeImage = "_im.png";
      base64DataSecundaryCharacter2 = await this.getImage(baseURL, numberImageSecundaryCharacter2, typeImage);
    } else if (numberImageSecundaryCharacter2 != -1) {
      baseURL = '/assets/cards/archetypes/arquetipos_0';
      typeImage = "_im.png";
      base64DataSecundaryCharacter2 = await this.getImage(baseURL, numberImageSecundaryCharacter2, typeImage);
    }

    this.generateHTML(base64DataPrincipalCharacter1, base64DataPrincipalCharacter2, base64DataSecundaryCharacter1, base64DataSecundaryCharacter2);

  }

  getImage(baseURL, numberImage, typeImage): Promise<string> {
    // Get data from subscriber and pass to image src
    return this.ocFileStorageSvc
      .getImageFromURL(baseURL + numberImage + typeImage).toPromise();
  }

  generateHTML(
    base64DataPrincipalCharacter1: string,
    base64DataPrincipalCharacter2: string,
    base64DataSecundaryCharacter1: string,
    base64DataSecundaryCharacter2: string) {

    var docDefinition = {
      pageSize: {
        width: 650,
        height: 'auto'
      },
      content: [
        this.getHTML(
          base64DataPrincipalCharacter1,
          base64DataPrincipalCharacter2,
          base64DataSecundaryCharacter1,
          base64DataSecundaryCharacter2
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
    base64DataSecundaryCharacter1: string,
    base64DataSecundaryCharacter2: string) {

    var imagePrincipalCharacter1 = '';
    var imagePrincipalCharacter2 = '';
    var imageSecundaryCharacter1 = '';
    var imageSecundaryCharacter2 = '';

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

    if (base64DataSecundaryCharacter1 != '') {
      imageSecundaryCharacter1 =
        `<br>
        <img src="${base64DataSecundaryCharacter1}" alt="Emotion" width="250" height="400">
      <br>`
    } else {
      imageSecundaryCharacter1 =
        `<br>
       <br>`
    }


    if (base64DataSecundaryCharacter2 != '') {
      imageSecundaryCharacter2 =
        `<br>
        <img src="${base64DataSecundaryCharacter2}" alt="Emotion" width="250" height="400">
      <br>`
    } else {
      imageSecundaryCharacter2 =
        `<br>
       <br>`
    }

    var html = htmlToPdfmake(`
    <table border="1" cellspacing="0" cellpadding="0" width="645">
      <tbody>
          <tr>
              <td style="width:655px;" colspan="2" valign="top">
                  <p style="text-align:center">
                      Principales
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
                      Secundarios
                  </p>
              </td>
          </tr>
          <tr>`
      +
      `<td width="323" style="text-align:center" valign="top">
                ${imageSecundaryCharacter1}
              </td>` +

      `<td width="323" style="text-align:center" valign="top">
              ${imageSecundaryCharacter2}
            </td>` +
      `</tr>
          <tr>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                      Características escogidas:
                  </p>
                  <p style="text-align:center">
                      ${this.secundaryCharacter1Characteristics}
                  </p>
              </td>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                    Características escogidas:
                  </p>
                  <p style="text-align:center">
                      ${this.secundaryCharacter2Characteristics}
                  </p>
              </td>
          </tr>
          <tr>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                      Motivaciones:
                  </p>
                  <p style="text-align:center">
                      ${this.secundaryCharacter1Motivation}
                  </p>
              </td>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                    Motivaciones:
                  </p>
                  <p style="text-align:center">
                      ${this.secundaryCharacter2Motivation}
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
