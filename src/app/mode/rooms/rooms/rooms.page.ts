import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router, RouterEvent } from '@angular/router';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  public searchRoom: string;
  public filteredRooms: any;
  public listRooms: any = [];
  public roomName: string;

  constructor(
    private alertCtrl: AlertController,
    public platform: Platform,
    public navCtrl: NavController,
    public toastController: ToastController,
    public router: Router,
    public dbService: NgxIndexedDBService,
    public _roomService: RoomService
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
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._roomService.getRoomFromUser(token.value.token).subscribe(
          rooms => {
            this.listRooms = rooms;
            this.filteredRooms = [...this.listRooms];
          }
        );
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }

  async chooseRoomName() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Qué nombre tendrá su sala?',
      inputs: [
        {
          name: 'roomName',
          type: 'text',
          placeholder: 'Nombre de sala',
          value: this.roomName,
          attributes: {
            maxlength: 50
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
            this.createRoom(data.roomName);
          }
        }
      ]
    });
    await alert.present();
  }

  createRoom(roomName) {
    var body = { roomName: roomName };
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._roomService.createRoom(body, token.value.token).subscribe(
          room => {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                  roomId: room.id,
              }
            }
            this.navCtrl.navigateForward(['rooms/detail'], navigationExtras);
          }
        );
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

  removeRoom(roomId) {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._roomService.removeRoom(roomId, token.value.token).subscribe(
          result => {
            this.getRooms();
            this.presentToast("La sala ha sido eliminado con éxito");
          }
        );
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
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
            this.removeRoom(roomId);
          }
        }
      ]
    });

    await alert.present();
  }
}
