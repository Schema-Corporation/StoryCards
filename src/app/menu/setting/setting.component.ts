import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  closeSession() {
    this.popoverController.dismiss('close');
  }

}
