import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { RoomService } from 'src/app/services/room/room.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public roomId: string = "";
  public room: any;
  public showRoomDetails: boolean = false;

  constructor(
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
    });
    this.location.replaceState('/rooms/detail');
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
            console.log('room: ', room);
            this.room = room;
            this.showRoomDetails = true;
          }
        );
      },
      error => {
        this.closeSession();
        console.log('error: ', error);
      });
  }

}
