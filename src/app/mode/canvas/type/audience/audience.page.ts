import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

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

  constructor(private alertCtrl: AlertController,
    public toastController: ToastController,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.startCanvas();
    this.getEmotionsCards();
    this.showCards(this.cards);
  }

  startCanvas() {
    this.step = 1;
  }
  addStep(){
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
          text:'Descargar',
          handler: () => {
            this.downloadCanvas();
          }
        },
        {
          text:'Guardar',
          handler:() => {
            this.saveCanvas();
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
    this.exportAsPDF();
    this.presentToast('Formato descargado');
  }

  async saveCanvas() {
    this.presentToast('¡Su formato se ha guardado con éxito!');
    await this.sleep(2500);
    this.navCtrl.navigateForward('canvas/canvas');
  }

  printCanvas() {
    this.presentToast('print');
  }

  exportAsPDF() {

    let div = document.getElementById('htmlData');

    console.log('data', div);

    //const div = document.getElementById('pdf');

    //const options = { background: 'white', height: 600, width: 1700 };

    domtoimage.toPng(div).then((dataUrl) => {
        //Initialize JSPDF
        const doc = new jsPDF('l', 'cm', 'a4');
        //Add image Url to PDF
        doc.addImage(dataUrl, 'PNG', 0, 0, 29.7, 21.0);
        doc.save('pdfDocument.pdf');
    });

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
