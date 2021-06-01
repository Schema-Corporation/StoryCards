import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitingGuestPageRoutingModule } from './waiting-guest-routing.module';

import { WaitingGuestPage } from './waiting-guest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitingGuestPageRoutingModule
  ],
  declarations: [WaitingGuestPage]
})
export class WaitingGuestPageModule {}
