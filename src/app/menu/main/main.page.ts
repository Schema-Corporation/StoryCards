import { Component, OnInit } from '@angular/core';
import { GroupsPage } from '../../mode/free/groups/groups.page';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  groupPage: GroupsPage;


  constructor(
    public navCtrl: NavController
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

}
