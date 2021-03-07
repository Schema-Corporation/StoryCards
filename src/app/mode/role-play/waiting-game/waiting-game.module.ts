import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitingGamePageRoutingModule } from './waiting-game-routing.module';

import { WaitingGamePage } from './waiting-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitingGamePageRoutingModule
  ],
  declarations: [WaitingGamePage]
})
export class WaitingGamePageModule {}
