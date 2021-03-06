import { Component, OnInit } from '@angular/core';
import { NavController, PickerController, Platform, ToastController } from '@ionic/angular';
import { PickerOptions } from "@ionic/core";



@Component({
  selector: 'app-add-canvas',
  templateUrl: './add-canvas.page.html',
  styleUrls: ['./add-canvas.page.scss'],
})
export class AddCanvasPage implements OnInit {

  selectedVal: number = 0; 

  constructor(
    public pickerController: PickerController,
    public navCtrl: NavController, 
    public platform:Platform,
    public toastController: ToastController) {

      this.platform.ready().then(()=>{
        this.getFormatOptions();
      })
     }

  ngOnInit() {
  }

  getFormatOptions() {
    let options = [];
    options = [
      {text: 'Formato de auditorio', value: 1},
      {text: 'Formato de aspectos estructurales y de contenido', value: 2},
      {text: 'Formato de personajes', value: 3},
      {text: 'Canvas de storytelling', value: 4},
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

  showCanvasPage() {
    if (this.selectedVal == 0) {
      this.presentToast("Por favor, selecciona un tipo de formato");
    } else {
      this.goToCreateFormatPage(Number(this.selectedVal));
    }
  }

  radioGroupChange(event) {
    this.selectedVal = event.detail.value;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
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
