import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { CanvasService } from 'src/app/services/canvas/canvas.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.page.html',
  styleUrls: ['./canvas.page.scss'],
})
export class CanvasPage implements OnInit {

  public searchFormat: string;
  public formats: any;
  public listFormats: any;

  constructor(private alertCtrl: AlertController,
    public platform: Platform,
    public navCtrl: NavController,
    public dbService: NgxIndexedDBService,
    public _canvasService: CanvasService) { }

  ngOnInit() {
    this.getFormats();
  }

  addFormat() {
    this.navCtrl.navigateForward('canvas/add-canvas')
  }

  getFormats() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._canvasService.getCanvasFromUser(token.value.token).subscribe(
          canvas => {
            this.listFormats = canvas;
          }
        );
      },
      error => {
          console.log('error: ', error);
      });
  }

  filterByFormatName(ev) {
    this.searchFormat = ev.detail.value;
    this.formats = this.listFormats;
    if (this.searchFormat && this.searchFormat.trim() != '') {
      this.listFormats = this.formats.filter((format) => {
          return (format.name.toLowerCase().indexOf(this.searchFormat.toLowerCase()) > -1);
      });
    } else {
      this.getFormats();
    }
  }

  editFormat(formatId) {

  }

  deleteFormat(formatId) {
    this.showAlertDelete(formatId);
  }

  removeFormat(formatId) {
    console.log('eliminar formato: ', formatId);
  }

  async showAlertDelete(formatId) {
    var alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Formato',
      message: '¿Está seguro de que desea eliminar este formato?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Sí',
          handler: () => {
            this.removeFormat(formatId);
          }
        }
      ]
    });

    await alert.present();
  }

}
