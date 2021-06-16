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
  selector: 'app-storytelling',
  templateUrl: './storytelling.page.html',
  styleUrls: ['./storytelling.page.scss'],
})
export class StorytellingPage implements OnInit {

  public rows: any;
  public columns: any;
  public step: number = 1;

  public maximumCharactersAllowed: number = 200;
  public maximumCharactersAllowed500: number = 500;
  public maximumCharactersAllowed1000: number = 1000;
  public maximumCharactersAllowed3000: number = 3000;

  public stage: string = "";
  public stageCharacters: number = 0;

  public character: string = "";
  public characterCharacters: number = 0;

  public conflict: string = "";
  public conflictCharacters: number = 0;

  public support: string = "";
  public supportCharacters: number = 0;

  public critical: string = "";
  public criticalCharacters: number = 0;

  public overcoming : string = "";
  public overcomingCharacters: number = 0;

  public outcome : string = "";
  public outcomeCharacters: number = 0;

  public complete : string = "";
  public completeCharacters: number = 0;

  public canvasBody: any;
  public canvasData: any;

  public buttons: any;

  private pdfObject = null;
  private isPrint: boolean = false;

  public isEdit: boolean = false;

  public data: any = null;
  public name: string = "";
  public canvasId: string = "";

  public role: number;
  public showSaveOption: boolean;

  constructor(private alertCtrl: AlertController,
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

    // step 1
    this.stage = canvasData.body.step1.stage;
    this.stageCharacters = this.stage.length;
    this.character = canvasData.body.step1.character;
    this.characterCharacters = this.character.length;

    // step 2
    this.conflict = canvasData.body.step2.conflict;
    this.conflictCharacters = this.conflict.length;
    this.support = canvasData.body.step2.support;
    this.supportCharacters = this.support.length;
    this.critical = canvasData.body.step2.critical;
    this.criticalCharacters = this.critical.length;

    // step 3
    this.overcoming = canvasData.body.step3.overcoming;
    this.overcomingCharacters = this.overcoming.length;
    this.outcome = canvasData.body.step3.outcome;
    this.outcomeCharacters = this.outcome.length;

    // step 4
    this.complete = canvasData.body.step4.complete;
    this.completeCharacters = this.complete.length;

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

  writeStage(ev: CustomEvent) {
    this.stage = ev.detail.value;
    this.stageCharacters = ev.detail.value.length;
  }

  writeCharacter(ev: CustomEvent) {
    this.character = ev.detail.value;
    this.characterCharacters = ev.detail.value.length;
  }

  writeConflict(ev: CustomEvent) {
    this.conflict = ev.detail.value;
    this.conflictCharacters = ev.detail.value.length;
  }

  writeSupport(ev: CustomEvent) {
    this.support = ev.detail.value;
    this.supportCharacters = ev.detail.value.length;
  }

  writeCritical(ev: CustomEvent) {
    this.critical = ev.detail.value;
    this.criticalCharacters = ev.detail.value.length;
  }

  writeOvercoming(ev: CustomEvent) {
    this.overcoming = ev.detail.value;
    this.overcomingCharacters = ev.detail.value.length;
  }

  writeOutcome(ev: CustomEvent) {
    this.outcome = ev.detail.value;
    this.outcomeCharacters = ev.detail.value.length;
  }

  writeComplete(ev: CustomEvent) {
    this.complete = ev.detail.value;
    this.completeCharacters = ev.detail.value.length;
  }

  finishCanvas() {
    this.showCanvasOption()
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

  async downloadCanvas() {
    this.isPrint = false;
    var base64ImageLogo = await this.getImage('/assets/icon/logo.png', '', '');
    this.createPDF(base64ImageLogo);
  }

  getCanvasData() {
    this.canvasData = {
      metadata: {
        numberSteps: 4,
        currentStep: this.step
      },
      body: {
        step1: {
          stage: this.stage,
          character: this.character,
        },
        step2: { 
          conflict: this.conflict,
          support: this.support,
          critical: this.critical, },
        step3: { 
          overcoming: this.overcoming,
          outcome: this.outcome,
         },
         step4: { 
          complete: this.complete,
         }
      }
    }
    return this.canvasData;
  }

  getCanvasBody(canvasName) {
    this.canvasBody = {
      name: canvasName,
      type: 4,
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
            id: 'txt-canvasName',
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

  getImage(baseURL, numberImage, typeImage): Promise<string> {
    // Get data from subscriber and pass to image src
    return this.ocFileStorageSvc
      .getImageFromURL(baseURL + numberImage + typeImage).toPromise();
  }

  async printCanvas() {

    this.isPrint = true;

    var base64ImageLogo = await this.getImage('/assets/icon/logo.png', '', '');
    this.createPDF(base64ImageLogo);

    this.presentToast('Formato abierto para imprimir');
  }

  createPDF(base64ImageLogo: string) {

    var docDefinition = {
      pageSize: {
        width: 650,
        height: 'auto'
      },
      content: [
        this.generateHTML(base64ImageLogo)
      ]
    };

    this.pdfObject = pdfMake.createPdf(docDefinition);

    if (!this.isPrint){
      // This method suportted web and device platform
      this.pdfObject.download('Formato_Storytelling.pdf');
    } else {
      this.pdfObject.open();
    }

    this.presentToast('Formato descargado');

  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }

  generateHTML(base64ImageLogo: string) {

    var html = htmlToPdfmake(`
    <img src="${base64ImageLogo}" width="250" height="75" style="opacity: 0.4; margin-left: 500px; margin-bottom: 10px;">
    <table border="1" cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
            <td style="width:100px" valign="top">
                <p style="text-align:center">
                    <strong>MOMENTOS</strong>
                </p>
            </td>
            <td style="width:250px;" valign="top">
                <p style="text-align:center; width:800px;">
                    <strong>PASOS</strong>
                    <strong></strong>
                </p>
            </td>
            <td style="width:295px;" valign="top">
                <p style="text-align:center">
                    <strong>HISTORIA COMPLETA</strong>
                    <strong></strong>
                </p>
            </td>
        </tr>
        <tr>
            <td width="90" rowspan="2" valign="top">
                <p align="center">
                    <strong></strong>
                </p>
                <p align="center">
                    <strong></strong>
                </p>
                <p align="center">
                    <strong></strong>
                </p>
                <p style="text-align:center">
                    <strong>INICIO</strong>
                    <strong></strong>
                </p>
            </td>
            <td width="326" valign="top">
                <p>
                    ESCENARIO:
                </p>
                <p>
                    ${this.stage}
                </p>
            </td>
            <td width="208" rowspan="7" valign="top">
                <p>
                    ${this.complete}
                </p>
            </td>
        </tr>
        <tr>
            <td width="326" valign="top">
                <p>
                    PERSONAJE:
                </p>
                <p>
                    ${this.character}
                </p>
            </td>
        </tr>
        <tr>
            <td width="90" rowspan="3" valign="top">
                <p align="center">
                    <strong></strong>
                </p>
                <p align="center">
                    <strong></strong>
                </p>
                <p align="center">
                    <strong></strong>
                </p>
                <p align="center">
                    <strong></strong>
                </p>
                <p align="center">
                    <strong></strong>
                </p>
                <p style="text-align:center">
                    <strong>NUDO</strong>
                    <strong></strong>
                </p>
            </td>
            <td width="326" valign="top">
                <p>
                    CONFLICTO:
                </p>
                <p>
                    ${this.conflict}
                </p>
            </td>
        </tr>
        <tr>
            <td width="326" valign="top">
                <p>
                    PUNTO CRÍTICO:
                </p>
                <p>
                    ${this.critical}
                </p>
            </td>
        </tr>
        <tr>
            <td width="326" valign="top">
                <p>
                    SOPORTE:
                </p>
                <p>
                    ${this.support}
                </p>
            </td>
        </tr>
        <tr>
            <td width="90" rowspan="2" valign="top">
                <p align="center">
                    <strong></strong>
                </p>
                <p align="center">
                    <strong></strong>
                </p>
                <p align="center">
                    <strong></strong>
                </p>
                <p align="center">
                    <strong></strong>
                </p>
                <p align="center">
                    <strong></strong>
                </p>
                <p style="text-align:center">
                    <strong>FIN</strong>
                    <strong></strong>
                </p>
            </td>
            <td width="326" valign="top">
                <p>
                    SUPERACIÓN:
                </p>
                <p>
                    ${this.overcoming}
                </p>
            </td>
        </tr>
        <tr>
            <td width="326" valign="top">
                <p>
                    DESENLACE:
                </p>
                <p>
                    ${this.outcome}
                </p>
            </td>
        </tr>
    </tbody>
  </table>
    `, {
      tableAutoSize:true
    });
    return html;
  }

}
