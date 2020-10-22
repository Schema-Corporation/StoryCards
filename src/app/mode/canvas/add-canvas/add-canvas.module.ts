import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCanvasPageRoutingModule } from './add-canvas-routing.module';

import { AddCanvasPage } from './add-canvas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCanvasPageRoutingModule
  ],
  declarations: [AddCanvasPage]
})
export class AddCanvasPageModule {}
