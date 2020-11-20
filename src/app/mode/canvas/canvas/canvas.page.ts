import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router, RouterEvent } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
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
  public listFormats: any = [];

  constructor(private alertCtrl: AlertController,
    public platform: Platform,
    public navCtrl: NavController,
    public toastController: ToastController,
    public router: Router,
    public dbService: NgxIndexedDBService,
    public _canvasService: CanvasService) { }

  ngOnInit() {
    this.getFormats();
    this.router.events.subscribe(
      (event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          this.getFormats()
        }
      });
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

  goToEditFormatPage(value, data) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(data)
      }
    }
    switch(value) {
      case 1: this.navCtrl.navigateForward('canvas/audience', navigationExtras); break;
      case 2: this.navCtrl.navigateForward('canvas/structural-aspects', navigationExtras); break;
      case 3: this.navCtrl.navigateForward('canvas/characters', navigationExtras); break;
      case 4: this.navCtrl.navigateForward('canvas/storytelling', navigationExtras); break;
      default: break;
    }
  }

  editFormat(formatId) {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._canvasService.getCanvasById(formatId, token.value.token).subscribe(
          canvas => {
            this.goToEditFormatPage(canvas.type, canvas);
          }
        );
      },
      error => {
          console.log('error: ', error);
      });
  }

  deleteFormat(formatId) {
    this.showAlertDelete(formatId);
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  removeFormat(formatId) {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._canvasService.removeCanvas(formatId, token.value.token).subscribe(
          result => {
            this.getFormats();
            this.presentToast("El formato ha sido eliminado con éxito");
          }
        );
      },
      error => {
          console.log('error: ', error);
      });
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
