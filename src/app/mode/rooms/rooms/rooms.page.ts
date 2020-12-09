import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  public searchRoom: string;
  public filteredRooms: any;
  public listRooms: any = [];

  constructor(
    private alertCtrl: AlertController,
    public platform: Platform,
    public navCtrl: NavController,
    public toastController: ToastController,
    public router: Router,
    public dbService: NgxIndexedDBService,
  ) { }

  ngOnInit() {
    this.getRooms();
    this.router.events.subscribe(
      (event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          this.getRooms()
        }
      });
  }

  getRooms() {
    this.listRooms = [ //TODO - SEVICE
      {
        id: 1,
        name: 'SALA 1'
      },
      {
        id: 2,
        name: 'SALA 2'
      },
      {
        id: 3,
        name: 'SALA 3'
      },
    ]
    this.filteredRooms = [...this.listRooms];
  }

  filterByRoomName(ev) {
    this.searchRoom = ev.detail.value;
    if (this.searchRoom) {
      this.listRooms = this.filteredRooms.filter((format) => {
        return (format.name.toLowerCase().indexOf(this.searchRoom.toLowerCase()) > -1);
      });
    } else {
      this.getRooms();
    }
  }

  editRoom(roomId) {
    console.log('TODO - EDIT ROOM SERVICE' + roomId);
  }

  deleteRoom(roomId) {
    this.showAlertDelete(roomId);
  }

  async showAlertDelete(roomId) {
    var alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Sala',
      message: '¿Está seguro de que desea eliminar esta sala?',
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
            console.log('TODO - DELETE ROOM SERVICE' + roomId);
          }
        }
      ]
    });

    await alert.present();
  }
}
