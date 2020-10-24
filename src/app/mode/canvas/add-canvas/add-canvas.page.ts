import { Component, OnInit } from '@angular/core';
import { NavController, PickerController } from '@ionic/angular';
import { PickerOptions } from "@ionic/core";

@Component({
  selector: 'app-add-canvas',
  templateUrl: './add-canvas.page.html',
  styleUrls: ['./add-canvas.page.scss'],
})
export class AddCanvasPage implements OnInit {

  constructor(private pickerController: PickerController,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  getFormatOptions() {
    let options = [];
    options = [
      {text: 'Formato de Auditorio', value: 1},
      {text: 'Formato de Aspectos Estructurales', value: 2},
      {text: 'Formato de Personajes', value: 3},
      {text: 'Canvas de Storytelling', value: 4},
    ] 
    return options;
  }

  goToCreateFormatPage(value) {
    switch(value) {
      case 1: this.navCtrl.navigateForward('canvas/audience'); break;
      case 2: this.navCtrl.navigateForward('canvas/structural-aspects'); break;
      case 3: this.navCtrl.navigateForward('canvas/characters'); break;
      case 4: this.navCtrl.navigateForward('canvas/storytelling'); break;
      default: break;
    }
  }

  async showFormatPicker() {
    let options: PickerOptions = {
        buttons: [
            {
              text: "Cancel",
              role: 'cancel'
            },
            {
              text:'Ok',
              handler:(value:any) => {
                this.goToCreateFormatPage(value.type.value);
              }
            }
          ],
          columns: [{
            name: 'type',
            options: this.getFormatOptions()
          }]
    };
    let picker = await this.pickerController.create(options);
    picker.present()
  }

}
