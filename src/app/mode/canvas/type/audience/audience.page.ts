import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AlertController, NavController, ToastController, Platform } from '@ionic/angular';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { OcFileStorageService } from 'src/app/util/OcFileStorageService';

import { NgxIndexedDBService } from 'ngx-indexed-db';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


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

  public maximumCharactersAllowed: number = 200;
  public maximumCharactersAllowed500: number = 500;

  public characteristics: string = "";
  public characteristicsCharacters: number = 0;

  public problems: string = "";
  public problemsCharacters: number = 0;

  public motivation: string = "";
  public motivationCharacters: number = 0;

  public action: string = "";
  public actionCharacters: number = 0;

  public goal: string = "";
  public goalCharacters: number = 0;

  public canvasBody: any;
  public canvasData: any;

  public buttons: any;

  public pdfObject = null;
  public isPrint: boolean = false;

  public isEdit: boolean = false;

  public data: any = null;
  public name: string = "";
  public canvasId: string = "";

  public rotate;
  public rotat;
  public isRotated: boolean = false;
  public role: number;
  
  public showSaveOption: boolean;

  constructor(public alertCtrl: AlertController,
    public toastController: ToastController,
    public navCtrl: NavController,

    public platform: Platform,
    public dbService: NgxIndexedDBService,
    public _canvasService: CanvasService,
    public _loginService: LoginService,
    public ocFileStorageSvc: OcFileStorageService,
    public route: ActivatedRoute,
    public file: File,
    public fileOpener: FileOpener) { }

  ngOnInit() {
    this.startCanvas();
    this.getEmotionsCards();
    this.showCards(this.cards);

    this.route.queryParams.subscribe(params => {
      if (params["data"] === undefined) {
        this.isEdit = false;
      } else {
        this.data = JSON.parse(params["data"]);
        this.fillCanvasData(this.data);
        this.isEdit = true;
      }
    });
    this.rotate = true;

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


  changeEmotion(emotion) {
    this.emotion = emotion;
    this.isRotated = false;
  }
  
  showRotate() {
    this.isRotated = !this.isRotated;
  }

  goToStepTwo() {
    this.step = 2;
  }

  fillCanvasData(data) {
    let canvasData = JSON.parse(data.data);

    // step 1
    this.characteristics = canvasData.body.step1.characteristic;
    this.characteristicsCharacters = this.characteristics.length;
    this.problems = canvasData.body.step1.problems;
    this.problemsCharacters = this.problems.length;
    this.motivation = canvasData.body.step1.motivation;
    this.motivationCharacters = this.motivation.length;
    this.action = canvasData.body.step1.calltoaction;
    this.actionCharacters = this.action.length;

    // step 2
    this.emotion = canvasData.body.step2.emotion;
    this.isRotated = canvasData.body.step2.isRotated;

    // step 3
    this.goal = canvasData.body.step3.goal;
    this.goalCharacters = this.goal.length;

    // canvas data
    this.name = data.name;
    this.canvasId = data.id;
  }

  startCanvas() {
    this.step = 1;
  }

  addStep() {
    this.step++
  }

  writeCharacteristics(ev: CustomEvent) {
    this.characteristics = ev.detail.value;
    this.characteristicsCharacters = ev.detail.value.length;
  }

  writeProblems(ev: CustomEvent) {
    this.problems = ev.detail.value;
    this.problemsCharacters = ev.detail.value.length;
  }

  writeMotivation(ev: CustomEvent) {
    this.motivation = ev.detail.value;
    this.motivationCharacters = ev.detail.value.length;
  }

  writeAction(ev: CustomEvent) {
    this.action = ev.detail.value;
    this.actionCharacters = ev.detail.value.length;
  }

  writeGoal(ev: CustomEvent) {
    this.goal = ev.detail.value;
    this.goalCharacters = ev.detail.value.length;
  }

  finishCanvas() {
    this.showCanvasOption()
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }

  async showCanvasOption() {

    // iOS and Android alert and options || Web browser options

    if (this.platform.is('ios') || this.platform.is('android')) {
      if (this.showSaveOption) {
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: '¿Qué acción deseas realizar?',
          message: 'Ahora que el formato está completo puedes descargarlo o guardarlo.',
          buttons: [
            {
              text:'Descargar',
              handler: () => {
                this.downloadCanvas();
              }
            },
            {
              text:'Guardar',
              handler:() => {
                alert.dismiss(); //here dismiss this alert
                this.chooseCanvasName();
              }
            }
          ]
        });
        await alert.present();
      } else {
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: '¿Qué acción deseas realizar?',
          message: 'Ahora que el formato está completo puedes descargarlo o guardarlo.',
          buttons: [
            {
              text:'Descargar',
              handler: () => {
                this.downloadCanvas();
              }
            }
          ]
        });
        await alert.present();
      }
    } else {
      if (this.showSaveOption) {
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: '¿Qué acción deseas realizar?',
          message: 'Ahora que el formato está completo puedes descargarlo, guardarlo o imprimirlo.',
          buttons: [
            {
              text:'Descargar',
              handler: () => {
                this.downloadCanvas();
              }
            },
            {
              text:'Guardar',
              handler:() => {
                alert.dismiss(); //here dismiss this alert
                this.chooseCanvasName();
              }
            },
            {
              text:'Imprimir',
              handler:() => {
                this.printCanvas();
              }
            }
          ]
        });
        await alert.present();
      } else {
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: '¿Qué acción deseas realizar?',
          message: 'Ahora que el formato está completo puedes descargarlo, guardarlo o imprimirlo.',
          buttons: [
            {
              text:'Descargar',
              handler: () => {
                this.downloadCanvas();
              }
            },
            {
              text:'Imprimir',
              handler:() => {
                this.printCanvas();
              }
            }
          ]
        });
        await alert.present();
      }
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getImage(baseURL, numberImage, typeImage): Promise<string> {
    // Get data from subscriber and pass to image src
    return this.ocFileStorageSvc
      .getImageFromURL(baseURL + numberImage + typeImage).toPromise();
  }

  async downloadCanvas() {
    this.isPrint = false;
    var base64ImageLogo = await this.getImage('/assets/icon/logo.png', '', '');
    if (this.emotion !=-1) {
      this.createPDF(this.cards[this.emotion].id, base64ImageLogo);
    } else {
      this.generateHTML('', base64ImageLogo);
    }
  }

  getCard(idCard) {
    var imgCard = "";
    if(idCard != -1) {
      imgCard = this.cards[idCard].imgCard;
    }
    return imgCard;
  }

  getCanvasData() {
    this.canvasData = {
      metadata: {
        numberSteps: 3,
        currentStep: this.step
      },
      body: {
        step1: {
          characteristic: this.characteristics,
          motivation: this.motivation,
          problems: this.problems,
          calltoaction: this.action,
        },
        step2: { emotion: this.emotion, card: this.getCard(this.emotion), isRotated: this.isRotated },
        step3: { goal: this.goal }
      }
    }
    return this.canvasData;
  }

  getCanvasBody(canvasName) {
    this.canvasBody = {
      name: canvasName,
      type: 1,
      data: JSON.stringify(this.getCanvasData())
    };

    return this.canvasBody;
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
              this.closeSession()
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
              this.closeSession()
              console.log('error: ', error);
            }
          );
        }
      },
      error => {
        this.closeSession()
          console.log('error: ', error);
      });
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

  async printCanvas() {

    this.isPrint = true;
    var base64ImageLogo = await this.getImage('/assets/icon/logo.png', '', '');
    if (this.emotion !=-1) {
      this.createPDF(this.cards[this.emotion].id, base64ImageLogo);
    } else {
      this.generateHTML('', base64ImageLogo);
    }

    this.presentToast('Formato abierto para imprimir');
  }

  async createPDF(numberImage: number, base64ImageLogo): Promise<any> {

    var baseURL = "";
    var typeImage = "";

    var base64DataEmotion = '';

    if (numberImage > 9 && !this.isRotated) {
      baseURL = '/assets/cards/emotions/emociones_';
      typeImage = "_im.png";
      base64DataEmotion = await this.getImage(baseURL, numberImage, typeImage);
    } else if (!this.isRotated) {
      baseURL = '/assets/cards/emotions/emociones_0';
      typeImage = "_im.png";
      base64DataEmotion = await this.getImage(baseURL, numberImage, typeImage);
    } else if (numberImage > 9 && this.isRotated) {
      baseURL = '/assets/cards/emotions/emociones_';
      typeImage = "_ud.png";
      base64DataEmotion = await this.getImage(baseURL, numberImage, typeImage);
    } else {
      baseURL = '/assets/cards/emotions/emociones_0';
      typeImage = "_ud.png";
      base64DataEmotion = await this.getImage(baseURL, numberImage, typeImage);
    }

    this.generateHTML(base64DataEmotion, base64ImageLogo);
  }

  generateHTML(base64Data: string, base64ImageLogo: string) {

    var docDefinition = {
      pageSize: {
        width: 650,
        height: 'auto'
      },
      content: [
        this.getHTML(base64Data, base64ImageLogo)
      ]
    };

    this.pdfObject = pdfMake.createPdf(docDefinition);

    if (!this.isPrint){
      // This method suportted web and device platform
      this.pdfObject.download('Formato_Auditorio.pdf');
    } else {
      this.pdfObject.open();
    }

    this.presentToast('Formato descargado');

  }

  getHTML(base64Image: string, base64ImageLogo: string) {

    var image = '';

    if (base64Image != '') {
      image = 
      `<td width="330" rowspan="2" valign="top" style="text-align:center">
        <br>
        <img src="${base64Image}" alt="Emotion" width="250" height="400">
        <br>
      </td>`
    } else {
      image = 
      `<td width="330" rowspan="2" valign="top" style="text-align:center">
        <br>
        <br>
      </td>`
    }

    var html = htmlToPdfmake(`
    <img src="${base64ImageLogo}" width="250" height="75" style="opacity: 0.4; margin-left: 500px; margin-bottom: 10px;">
    <table border="1" cellspacing="0" cellpadding="0" width="660">
      <tbody>
          <tr>
              <td width="330" valign="top">
                  <p style="text-align:center">
                      <strong>Audiencia: Características</strong>
                  </p>
              </td>
              <td width="330" valign="top">
                  <p style="text-align:center">
                      <strong>
                          Emoción: ¿qué emoción deseas despertar en el auditorio?
                      </strong>
                      <strong></strong>
                  </p>
              </td>
          </tr>
          <tr>
              <td width="330" valign="top">
                  <p style="text-align:center">
                      Características de los grupos
                  </p>
                  <p style="text-align:center">
                      ¿Quiénes son?
                  </p>
                  <br>
                  <p style="text-align:center;">
                      ${this.characteristics}
                  </p>
                <br>
              </td>` 
              + image +
          `</tr>
          <tr>
              <td width="330" valign="top">
                  <p style="text-align:center">
                      Problemas
                  </p>
                  <p style="text-align:center">
                      ¿Qué les preocupa? ¿Qué necesitan?
                  </p>
                  <br>
                  <p style="text-align:center">
                      ${this.problems}
                  </p>
                  <br>
              </td>
          </tr>
          <tr>
              <td width="330" rowspan="2" valign="top">
                  <p style="text-align:center">
                      Motivación
                  </p>
                  <p style="text-align:center">
                      ¿Qué hacen aquí? ¿Qué quieren?
                  </p>
                  <p style="text-align:center">
                      ¿Qué buscan?
                  </p>
                  <br>
                  <p style="text-align:center">
                      ${this.motivation}
                  </p>
                  <br>
              </td>
              <td width="330" valign="top">
                  <p style="text-align:center">
                      <strong>Meta: ¿qué deseas lograr?</strong>
                  </p>
              </td>
          </tr>
          <tr>
              <td width="330" rowspan="2" valign="top">
                  <br>
                  <p style="text-align:center;">
                      ${this.goal}
                  </p>
                  <br>
              </td>
          </tr>
          <tr>
              <td width="330" valign="top">
                  <p style="text-align:center">
                      Llamamiento a la acción
                  </p>
                  <p style="text-align:center">
                      ¿Qué se espera de ellos?
                  </p>
                  <br>
                  <p style="text-align:center">
                      ${this.action}
                  </p>
                  <br>
              </td>
          </tr>
      </tbody>
    </table>
    `);
    return html;
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
  };

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
