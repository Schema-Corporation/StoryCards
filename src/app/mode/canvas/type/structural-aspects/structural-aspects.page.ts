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
  public isPrint: boolean = false;
  public isEdit: boolean = false;
  public canvasBody: any;
  public canvasData: any;
  public data: any = null;
  public name: string = "";
  public canvasId: string = "";

  public role: number;
  public showSaveOption: boolean;

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
    public ocFileStorageSvc: OcFileStorageService,
    public toastController: ToastController,
    public platform: Platform,
    public dbService: NgxIndexedDBService,
    public _canvasService: CanvasService,
    public _loginService: LoginService,
    public alertCtrl: AlertController,
    public route: ActivatedRoute) { }

  ngOnInit() {
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

    this.plot = canvasData.body.plot;
    this.gender = canvasData.body.gender;
    this.myths = canvasData.body.myths;
    this.theme = canvasData.body.theme;

    // canvas data
    this.name = data.name;
    this.canvasId = data.id;
  }

  getCanvasData() {
    this.canvasData = {
      metadata: {
        numberSteps: 0
      },
      body: {
        plot: this.plot,
        gender: this.gender,
        myths: this.myths,
        theme: this.theme
      }
    }
    return this.canvasData;
  }

  getCanvasBody(canvasName) {
    this.canvasBody = {
      name: canvasName,
      type: 2,
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

    switch(this.title) {
      case 'Trama': this.cardSelected = this.plot; break;
      case 'Género': this.cardSelected = this.gender; break;
      case 'Mitos': this.cardSelected = this.myths; break;
      case 'Tema': this.cardSelected = this.theme; break;
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
  
  changeCard(cardSelected) {

    this.cardSelected = cardSelected;

    switch(this.title) {
      case 'Trama':
        this.plot = this.cardSelected;
      break;
      case 'Género':
        this.gender = this.cardSelected;
      break;
      case 'Mitos':
        this.myths = this.cardSelected;
      break;
      case 'Tema':
        this.theme = this.cardSelected;
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

  async downloadCanvas() {
    this.isPrint = false;

    if (this.plot ==-1 && this.gender ==-1 && this.myths == -1 && this.theme == -1) {
      var base64ImageLogo = await this.getImage('/assets/icon/logo.png', '', '');
      this.generateHTML('', '', '', '', base64ImageLogo);
    } else {
      this.createPDF(
        this.plot != -1 ? this.plot + 1: -1,
        this.gender != -1 ? this.gender + 1: -1,
        this.myths != -1 ? this.myths + 1: -1,
        this.theme != -1 ? this.theme + 1: -1);
    }
  }

  async printCanvas() {
    this.isPrint = true;
    if (this.plot ==-1 && this.gender ==-1 && this.myths == -1 && this.theme == -1) {
      var base64ImageLogo = await this.getImage('/assets/icon/logo.png', '', '');
      this.generateHTML('', '', '', '', base64ImageLogo);
    } else {
      this.createPDF(
        this.plot != -1 ? this.plot + 1: -1,
        this.gender != -1 ? this.gender + 1: -1,
        this.myths != -1 ? this.myths + 1: -1,
        this.theme != -1 ? this.theme + 1: -1);
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

    var base64ImageLogo = await this.getImage('/assets/icon/logo.png', '', '');

    this.generateHTML(base64DataPlot, base64DataGender, base64DataMyths, base64DataTheme, base64ImageLogo);

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
    base64ImageTheme: string,
    base64ImageLogo: string) {

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
          base64ImageTheme,
          base64ImageLogo
        )
      ]
    };

    this.pdfObject = pdfMake.createPdf(docDefinition);

    if (!this.isPrint){
      // This method suportted web and device platform
      this.pdfObject.download('Formato_Aspectos_Estructurales.pdf');
      this.presentToast('Formato descargado');
    } else {
      this.pdfObject.open();
    }

  }

  getHTML(
    base64ImagePlot: string,
    base64ImageGender: string,
    base64ImageMyths: string,
    base64ImageTheme: string,
    base64ImageLogo: string) {

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
    <img src="${base64ImageLogo}" width="250" height="75" style="opacity: 0.4; margin-left: 500px; margin-bottom: 10px;">
    <table border="1" cellspacing="0" cellpadding="0" width="645">
      <tbody>
          <tr>
              <td style="width:655px;" colspan="2" valign="top">
                  <p style="text-align:center">
                      Aspectos estructurales
                  </p>
              </td>
          </tr>
          <tr>
              <td style="width:364px;" valign="top">
                  <p style="text-align:center">
                      Trama (orden de la historia)
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
