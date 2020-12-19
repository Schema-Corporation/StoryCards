import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { RoomService } from 'src/app/services/room/room.service';
import { AlertController, NavController } from '@ionic/angular';

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
    public _roomService: RoomService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roomId = params["roomId"];
      this.getRoom(this.roomId);
      this.getParticipants(this.roomId);
    });
    this.location.replaceState('/rooms/detail');
  }

  getParticipants(roomId) {
    let participants = [{fullName: "Marcelo Ríos"}, {fullName: "Alvaro Toconas"}, {fullName: "Emmanuel Gonzales"}];
    this.participants = participants;
  }

  removeParticipant(guestId) {
    this.showAlertDeleteParticipant(guestId);
  }

  removeGuest(guestId) {
    console.log('TO-DO REMOVE GUEST');
  }

  async showAlertDeleteParticipant(guestId) {
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
