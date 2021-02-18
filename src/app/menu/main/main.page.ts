import { Component, OnInit } from '@angular/core';
import { GroupsPage } from '../../mode/free/groups/groups.page';
import { AlertController, NavController, PopoverController } from '@ionic/angular';
import { SettingComponent } from '../setting/setting.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { LoginService } from 'src/app/services/auth/login.service';
import { RolePlayingGuestService } from 'src/app/services/role-playing/role-playing-guest/role-playing-guest.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  groupPage: GroupsPage;

  public isFirst: boolean = false;

  public fullName: string = "";
  public role: number;


  constructor(
    public navCtrl: NavController,
    public popoverController: PopoverController,
    public dbService: NgxIndexedDBService,
    public route: ActivatedRoute,
    public location: Location,
    public alertCtrl: AlertController,
    public _loginService: LoginService,
    public _rolePlayingGuestService: RolePlayingGuestService
  ) {
    
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.first == 'true') {
        this.isFirst = params.first;
        var key: number = Number(params.key);
        this.dbService.getByIndex('variables', 'name', 'welcome').subscribe(
          welcome => {
            if (this.isFirst && welcome.value) {
              this.dbService.update('variables', { name: 'welcome', value: false, id: key }).subscribe(
                welcome => {
                  var title = "¡Bienvenido a Storycards!"
                  var message = "Tu registro ha sido realizado con éxito"
                  this.showAlert(title, message);
                }
              );
            }
          }
        );
      }
    });

    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        if (token != null && token.value.fullName != "undefined") {
          this.fullName = token.value.fullName;
        }

        this._loginService.validateRole(token.value.token).subscribe(role => {
          switch (role.role) {
            case 'HOST': this.role = 1; break;
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

  async showAlert(title, message) {
    var alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: title,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.location.replaceState('/menu/main');
        }
      }]
    });

    await alert.present();
  }

  goToFreeModePage(){
    this.navCtrl.navigateForward('free/groups');
  }

  goToCanvasModePage() {
    this.navCtrl.navigateForward('canvas/canvas');
  }

  goToRolePlayModePage() {
    if (this.validateGuestsNumber()) {
      this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._rolePlayingGuestService.enterWaitingRoom(token.value.token).subscribe(role => {
          console.log('role: ', role);
          this.navCtrl.navigateForward('waiting-guest');
        }, error => {
          console.log('error: ', error);
          this.closeSession();
        })
      },
      error => {
        this.closeSession();
      });
    }
  }

  goToRoomModePage() {
    this.navCtrl.navigateForward('rooms/my-rooms');
  }

  validateGuestsNumber() {
    console.log('TO-DO VALIDATE GUESTS NUMBER')
    return true;
  }

  async presentPopover(ev: any) {
    let popover = await this.popoverController.create({
      component: SettingComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    popover.onDidDismiss().then((result) => {
      if (result != 'undefined') {
        if (result.data == 'close') {
          this.closeSession();
        }
      }
    })
    return await popover.present();
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }

}
