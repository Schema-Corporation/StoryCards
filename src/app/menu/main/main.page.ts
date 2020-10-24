import { Component, OnInit } from '@angular/core';
import { GroupsPage } from '../../mode/free/groups/groups.page';
import { AlertController, NavController, PopoverController } from '@ionic/angular';
import { SettingComponent } from '../setting/setting.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  groupPage: GroupsPage;

  public isFirst: boolean = false;

  public fullName: string = "";


  constructor(
    public navCtrl: NavController,
    public popoverController: PopoverController,
    private dbService: NgxIndexedDBService,
    private route: ActivatedRoute,
    private location: Location,
    private alertCtrl: AlertController
  ) {
    
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.first == 'true') {
        this.isFirst = params.first;
        if (this.isFirst) {
          var title = "¡Bienvenido a Storycards!"
          var message = "Tu registro ha sido realizado con éxito"
          this.showAlert(title, message);
        }
      }
    });

    this.dbService.getByIndex('variables', 'name', 'token').subscribe(
      token => {
        if (token != null && token.value.fullName != "undefined") {
          this.fullName = token.value.fullName;
        }
      },
      error => {
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
    this.navCtrl.navigateForward('free/groups')
  }

  goToCanvasModePage() {
    this.navCtrl.navigateForward('canvas/canvas')
  }

  goToRolePlayModePage(){
    this.navCtrl.navigateForward('create-character')
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
