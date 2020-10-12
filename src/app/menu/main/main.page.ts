import { Component, OnInit } from '@angular/core';
import { GroupsPage } from '../../mode/free/groups/groups.page';
import { NavController, PopoverController } from '@ionic/angular';
import { SettingComponent } from '../setting/setting.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  groupPage: GroupsPage;


  constructor(
    public navCtrl: NavController,
    public popoverController: PopoverController,
    private dbService: NgxIndexedDBService
  ) {
    
   }

  ngOnInit() {
  }

  goToFreeModePage(){
    this.navCtrl.navigateForward('free/groups')
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
