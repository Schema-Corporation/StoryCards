import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { RoomService } from 'src/app/services/room/room.service';
import { AlertController, NavController } from '@ionic/angular';
import { GuestService } from 'src/app/services/guest/guest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public roomId: string = "";
  public participants: any;
  public room: any;
  public showRoomDetails: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    public route: ActivatedRoute,
    public location: Location,
    public navCtrl: NavController,
    public dbService: NgxIndexedDBService,
    public _roomService: RoomService,
    public _guestService: GuestService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roomId = params["roomId"];
      this.getRoom(this.roomId);
    });
    this.location.replaceState('/rooms/detail');
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._guestService.openWebSocket(this.roomId, token.value.token);
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }
  
  ngOnDestroy() {
    this._guestService.closeWebSockets();
  }

  removeParticipant(guestId) {
    this.showAlertDeleteParticipant(guestId);
  }

  enoughReadyParticipants() {
    return this._guestService.guests.filter(x => x.status == "2").length > 0;
  }

  removeGuest(guestId) {
    console.log('TO-DO REMOVE GUEST');
  }

  async showAlertDeleteParticipant(guestId) {
    var alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Participante',
      message: '¿Está seguro de que desea eliminar a este participante?',
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
            this.removeGuest(guestId);
          }
        }
      ]
    });

    await alert.present();
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }

  getRoom(roomId) {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._roomService.getRoomById(roomId, token.value.token).subscribe(
          room => {
            this.room = room;
            this.showRoomDetails = true;
          }, 
          error => {
            this.closeSession();
            console.log('error: ', error);
          }
        );
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

}
