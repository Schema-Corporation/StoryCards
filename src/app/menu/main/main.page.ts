import { Component, OnInit } from '@angular/core';
import { GroupsPage } from '../../mode/free/groups/groups.page';
import { AlertController, NavController, PopoverController } from '@ionic/angular';
import { SettingComponent } from '../setting/setting.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { LoginService } from 'src/app/services/auth/login.service';
import { RolePlayingGuestService } from 'src/app/services/role-playing/role-playing-guest/role-playing-guest.service';
import { GuestService } from 'src/app/services/guest/guest.service';

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
    public _rolePlayingGuestService: RolePlayingGuestService,
    public _guestService: GuestService
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

    this.validateRole();
  }

  validateRole() {
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
          this.closeSession();
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

  validateUserActivity() {
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        this._loginService.checkUserActivity(token.value.token).subscribe(userActivity => {
          if (userActivity) {
            // do nothing
          } else {
            console.log('user disabled');
            this.closeSession();
          }
        }, error => {
          console.log('error: ', error);
          this.closeSession();
        })
      },
      error => {
        this.closeSession();
      });
  }

  goToFreeModePage(){
    if (this.role == 2) this.validateUserActivity();
    this.navCtrl.navigateForward('free/groups');
  }

  goToCanvasModePage() {
    switch (this.role) {
      case 1: this.navCtrl.navigateForward('canvas/canvas'); break;
      case 2: this.validateUserActivity(); this.navCtrl.navigateForward('canvas/add-canvas'); break;
      default: this.navCtrl.navigateForward('canvas/add-canvas'); break;
    }
  }

  goToRolePlayModePage() {
    this.validateUserActivity();
    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
    token => {
      this._rolePlayingGuestService.validateWaitingRoom(token.value.token).subscribe(allowParticipant => {
        if (allowParticipant) {
          this._rolePlayingGuestService.enterWaitingRoom(token.value.token).subscribe(role => {
            console.log('role: ', role);
            this.navCtrl.navigateForward('role-playing/waiting-guest');
          }, error => {
            console.log('error: ', error);
            this.closeSession();
          })
        } else {
          var title = "¡Lo sentimos!";
          var message = "La sala de espera del juego ya cuenta con el número máximo de participantes. Inténtelo más tarde.";
          this.showAlert(title, message);
        }
      });
    },
    error => {
      this.closeSession();
    });
  }

  goToRoomModePage() {
    this.navCtrl.navigateForward('rooms/my-rooms');
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
          if (this.role == 2) {
            this.dbService.getByIndex('variables', 'name', 'token').subscribe(
              token => {
                this._guestService.leaveRoom(token.value.token).subscribe(guest => {
                  console.log('guest: ', guest);
                }, error => {
                  this.closeSession();
                })
              },
              error => {
                this.closeSession();
              });
          }
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
