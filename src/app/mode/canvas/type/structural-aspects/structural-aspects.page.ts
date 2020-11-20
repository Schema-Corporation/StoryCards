import { Component, OnInit } from '@angular/core';
import { IGroup } from 'src/common/types/groups';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { OcFileStorageService } from 'src/app/util/OcFileStorageService';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-structural-aspects',
  templateUrl: './structural-aspects.page.html',
  styleUrls: ['./structural-aspects.page.scss'],
})
export class StructuralAspectsPage implements OnInit {

  public id: any;
  public cards: any;
  public title: any;
  public rows: any;
  public columns: any;
  public showDivCards: boolean = false;
  public cardSelected: number = -1;
  public plot: number = -1;
  public gender: number = -1;
  public myths: number = -1;
  public theme: number = -1;
  private pdfObject = null;

  group1: IGroup  = {
    id: 1,
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
      }
    ]
  }
  group2: IGroup  = {
    id: 2,
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
      }
    ]
  }
  group3: IGroup  = {
    id: 3,
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
      }
    ]
  }
  group4: IGroup  = {
    id: 4,
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
      }
    ]
  }

  constructor(
    public navCtrl: NavController,
    private ocFileStorageSvc: OcFileStorageService,
    public toastController: ToastController,
    public platform: Platform,) { }

  ngOnInit() {
      

  }

  showCards(id, cards, title) {

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

    switch(this.title) {
      case 'Trama':
        this.plot = this.cardSelected;
        console.log('card plot selected: ', this.plot);
      break;
      case 'Género':
        this.gender = this.cardSelected;
        console.log('card gender selected: ', this.gender);
      break;
      case 'Mitos':
        this.myths = this.cardSelected;
        console.log('card myths selected: ', this.myths);
      break;
      case 'Tema':
        this.theme = this.cardSelected;
        console.log('card theme selected: ', this.theme);
      break;
    }
  }

  back() {
    this.cardSelected = -1;
    this.showDivCards = false;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  downloadCanvas() {
    if (this.plot ==-1 && this.gender ==-1 && this.myths == -1 && this.theme == -1) {
      this.generateHTML('', '', '', '');
    } else {
      this.createPDF(
        this.plot != -1 ? this.cards[this.plot].id: -1,
        this.gender != -1 ? this.cards[this.gender].id: -1,
        this.myths != -1 ? this.cards[this.myths].id: -1,
        this.theme != -1 ? this.cards[this.theme].id: -1);
    }
  }

  async createPDF(
    numberImagePlot: number,
    numberImageGender: number,
    numberImageMyths: number,
    numberImageTheme: number): Promise<any> {

    var baseURL = "";
    var typeImage = "";

    var base64DataPlot = '';
    var base64DataGender = '';
    var base64DataMyths = '';
    var base64DataTheme = '';

    if (numberImagePlot > 9) {
      baseURL = '/assets/cards/plot/trama_';
      typeImage = "_im.png";
      base64DataPlot = await this.getImage(baseURL, numberImagePlot, typeImage);
    } else if (numberImagePlot != -1) {
      baseURL = '/assets/cards/plot/trama_0';
      typeImage = "_im.png";
      base64DataPlot = await this.getImage(baseURL, numberImagePlot, typeImage);
    }
    if (numberImageGender > 9) {
      baseURL = '/assets/cards/genres/genero_';
      typeImage = "_im.png";
      base64DataGender = await this.getImage(baseURL, numberImageGender, typeImage);
    } else if (numberImageGender != -1) {
      baseURL = '/assets/cards/genres/genero_0';
      typeImage = "_im.png";
      base64DataGender = await this.getImage(baseURL, numberImageGender, typeImage);
    }

    if (numberImageMyths > 9) {
      baseURL = '/assets/cards/myths/mitos_';
      typeImage = "_im.png";
      base64DataMyths = await this.getImage(baseURL, numberImageMyths, typeImage);
    } else if (numberImageMyths != -1) {
      baseURL = '/assets/cards/myths/mitos_0';
      typeImage = "_im.png";
      base64DataMyths = await this.getImage(baseURL, numberImageMyths, typeImage);
    }

    if (numberImageTheme > 9) {
      baseURL = '/assets/cards/topic/tema_';
      typeImage = "_im.png";
      base64DataTheme = await this.getImage(baseURL, numberImageTheme, typeImage);
    } else if (numberImageTheme != -1){
      baseURL = '/assets/cards/topic/tema_0';
      typeImage = "_im.png";
      base64DataTheme = await this.getImage(baseURL, numberImageTheme, typeImage);
    }

    this.generateHTML(base64DataPlot, base64DataGender, base64DataMyths, base64DataTheme);

  }

  getImage(baseURL, numberImage, typeImage): Promise<string> {
    // Get data from subscriber and pass to image src
    return this.ocFileStorageSvc
      .getImageFromURL(baseURL + numberImage + typeImage).toPromise();
  }

  generateHTML(
    base64ImagePlot: string,
    base64ImageGender: string,
    base64ImageMyths: string,
    base64ImageTheme: string) {

    var docDefinition = {
      pageSize: {
        width: 650,
        height: 'auto'
      },
      content: [
        this.getHTML(
          base64ImagePlot,
          base64ImageGender,
          base64ImageMyths,
          base64ImageTheme
        )
      ]
    };

    this.pdfObject = pdfMake.createPdf(docDefinition);

    this.pdfObject.download('Formato_Aspectos_Estructurales.pdf');

    this.presentToast('Formato descargado');

  }

  getHTML(
    base64ImagePlot: string,
    base64ImageGender: string,
    base64ImageMyths: string,
    base64ImageTheme: string) {

    var imagePlot = '';
    var imageGender = '';
    var imageMyths = '';
    var imageTheme = '';

    if (base64ImagePlot != '') {
      imagePlot = 
      `<br>
        <img src="${base64ImagePlot}" alt="Emotion" width="250" height="400">
      <br>`
    } else {
      imagePlot = 
      `<br>
       <br>`
    }

    if (base64ImageGender != '') {
      imageGender = 
      `<br>
        <img src="${base64ImageGender}" alt="Emotion" width="250" height="400">
      <br>`
    } else {
      imageGender = 
      `<br>
       <br>`
    }

    if (base64ImageMyths != '') {
      imageMyths = 
      `<br>
        <img src="${base64ImageMyths}" alt="Emotion" width="250" height="400">
      <br>`
    } else {
      imageMyths = 
      `<br>
       <br>`
    }


    if (base64ImageTheme != '') {
      imageTheme = 
      `<br>
        <img src="${base64ImageTheme}" alt="Emotion" width="250" height="400">
      <br>`
    } else {
      imageTheme = 
      `<br>
       <br>`
    }

    var html = htmlToPdfmake(`
    <table border="1" cellspacing="0" cellpadding="0" width="645">
      <tbody>
          <tr>
              <td style="width:655px;" colspan="2" valign="top">
                  <p style="text-align:center">
                      Aspectos estruturales
                  </p>
              </td>
          </tr>
          <tr>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                      Trama (Orden de la historia)
                  </p>
              </td>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                      Género (estilo)
                  </p>
              </td>
          </tr>
          <tr>`
              +
              `<td width="330" style="text-align:center" valign="top">
                ${imagePlot}
              </td>` +

              `<td width="330" style="text-align:center" valign="top">
                ${imageGender}
              </td>` +
          `</tr>
          <tr>
              <td width="645" colspan="2" valign="top">
                  <p style="text-align:center">
                      Aspectos de contenido
                  </p>
              </td>
          </tr>
          <tr>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                      Contexto (Mito base)
                  </p>
              </td>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                      Tema (Storyline)
                  </p>
              </td>
          </tr>
          <tr>`
            +
            `<td width="323" style="text-align:center" valign="top">
                ${imageMyths}
              </td>` +   
            
            `<td width="323" style="text-align:center" valign="top">
              ${imageTheme}
            </td>` +
          `</tr>
      </tbody>
  </table>
    `, {
      tableAutoSize:true
    });
    return html;
  }

}
