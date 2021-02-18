import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { RolePlayingGuestService } from 'src/app/services/role-playing/role-playing-guest/role-playing-guest.service';

@Component({
  selector: 'app-waiting-guest',
  templateUrl: './waiting-guest.page.html',
  styleUrls: ['./waiting-guest.page.scss'],
})
export class WaitingGuestPage implements OnInit {

  constructor(public navCtrl: NavController,
    public dbService: NgxIndexedDBService,
    public _rolePlayingGuestService: RolePlayingGuestService) { }

  ngOnInit() {
    
  }

  leaveRoom() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._rolePlayingGuestService.leaveWaitingRoom(token.value.token).subscribe(role => {
          console.log('role: ', role);
        }, error => {
          console.log('error: ', error);
        })

      },
      error => {
        this.closeSession();
      });
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }

}
