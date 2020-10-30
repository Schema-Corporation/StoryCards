import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController, Platform } from '@ionic/angular';

//import jsPDF from 'jspdf';
//import domtoimage from 'dom-to-image';
import { File as FileI } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { OcFileStorageService } from 'src/app/util/OcFileStorageService';

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

  private pdfObject = null;

  constructor(private alertCtrl: AlertController,
    public toastController: ToastController,
    public navCtrl: NavController,
    private plt: Platform,
    private file: FileI,
    private fileOpener: FileOpener,
    private ocFileStorageSvc: OcFileStorageService) { }

  ngOnInit() {
    this.startCanvas();
    this.getEmotionsCards();
    this.showCards(this.cards);
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

  async showCanvasOption() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Qué acción deseas realizar?',
      message: 'Ahora que el formato está completo puedes descargarlo, guardarlo o imprimirlo.',
      buttons: [
        {
          text: 'Descargar',
          handler: () => {
            this.downloadCanvas();
          }
        },
        {
          text: 'Guardar',
          handler: () => {
            this.saveCanvas();
          }
        },
        {
          text: 'Imprimir',
          handler: () => {
            this.printCanvas();
          }
        }
      ]
    });

    await alert.present();
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

  downloadCanvas() {

    if (this.emotion !=-1) {
      this.createPDF(this.cards[this.emotion].id);
    }
  }

  async saveCanvas() {
    this.presentToast('¡Su formato se ha guardado con éxito!');
    await this.sleep(2500);
    this.navCtrl.navigateForward('canvas/canvas');
  }

  printCanvas() {
    this.presentToast('print');
  }

  createPDF(numberImage: number): any {

    var baseURL = "";

    if (numberImage > 9) {
      baseURL = 'https://raw.githubusercontent.com/Schema-Corporation/StoryCards/dev/src/assets/cards/emotions/emociones_';
    } else {
      baseURL = 'https://raw.githubusercontent.com/Schema-Corporation/StoryCards/dev/src/assets/cards/emotions/emociones_0';
    }

    // Get data from subscriber and pass to image src
    this.ocFileStorageSvc
      .getStoredFile('emociones_0' + numberImage, 
        baseURL + numberImage + '_im.png')
      .subscribe((base64Data: string) => {

        var docDefinition = {
          content: [
            this.getHTML(base64Data)
          ]
        };
    
        this.pdfObject = pdfMake.createPdf(docDefinition);

        this.pdfObject.download();

        this.presentToast('Formato descargado');

      });
  }

  getHTML(base64Image: string) {

    var html = htmlToPdfmake(`
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
                  <p style="text-align:center">
                      ${this.characteristics}
                  </p>
                <br>
              </td>
              <td width="330" rowspan="2" valign="top" style="text-align:center">
                <br>
                <img src="${base64Image}" alt="Emotion" width="150" height="230">
                <br>
              </td>
          </tr>
          <tr>
              <td width="330" valign="top">
                  <p style="text-align:center">
                      Problemas
                  </p>
                  <p style="text-align:center">
                      ¿Qué les preocupa? ¿Qué neceistan?
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
                  <p style="text-align:center">
                      <strong></strong>
                  </p>
                  <p style="text-align:center">
                      <strong></strong>
                  </p>
                  <p style="text-align:center">
                      <strong></strong>
                  </p>
                  <p style="text-align:center">
                      <strong></strong>
                  </p>
                  <p style="text-align:center">
                      <strong></strong>
                  </p>
                  <p style="text-align:center">
                      <strong></strong>
                  </p>
                  <p>
                      <strong></strong>
                  </p>
                  <br>
                  <p style="text-align:center">
                      ${this.goal}
                  </p>
                  <br>
              </td>
          </tr>
          <tr>
              <td width="330" valign="top">
                  <p style="text-align:center">
                      LLamamiento a la acción
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
      imgCard: '/assets/cards/emotions/emociones_01_im.png'
    },
    {
      id: 2,
      imgCard: '/assets/cards/emotions/emociones_02_im.png'
    },
    {
      id: 3,
      imgCard: '/assets/cards/emotions/emociones_03_im.png'
    },
    {
      id: 4,
      imgCard: '/assets/cards/emotions/emociones_04_im.png'
    },
    {
      id: 5,
      imgCard: '/assets/cards/emotions/emociones_05_im.png'
    },
    {
      id: 6,
      imgCard: '/assets/cards/emotions/emociones_06_im.png'
    },
    {
      id: 7,
      imgCard: '/assets/cards/emotions/emociones_07_im.png'
    },
    {
      id: 8,
      imgCard: '/assets/cards/emotions/emociones_08_im.png'
    },
    {
      id: 9,
      imgCard: '/assets/cards/emotions/emociones_09_im.png'
    },
    {
      id: 10,
      imgCard: '/assets/cards/emotions/emociones_10_im.png'
    },
    {
      id: 11,
      imgCard: '/assets/cards/emotions/emociones_11_im.png'
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
