import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestTurnPageRoutingModule } from './guest-turn-routing.module';

import { GuestTurnPage } from './guest-turn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestTurnPageRoutingModule
  ],
  declarations: [GuestTurnPage]
})
export class GuestTurnPageModule {}
