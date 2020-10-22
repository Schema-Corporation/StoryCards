import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

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
    public navCtrl: NavController) { }

  ngOnInit() {
    this.showComponents();
    this.getFormats();
  }

  showComponents() {
    if (this.platform.is('ios')) {
      console.log('');
    }
  }

  addFormat() {
    this.navCtrl.navigateForward('canvas/add-canvas')
  }

  getFormats() {
    this.formats = [
      {id: 'u201521895', name: 'Formato auditorio WX-51'},
      {id: 'u201611028', name: 'Prueba me quedé'},
      {id: 'u111111111', name: 'Que viva cristo'}
    ];
    this.listFormats = this.formats;
  }

  filterByFormatName(ev) {
    this.searchFormat = ev.detail.value;
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
