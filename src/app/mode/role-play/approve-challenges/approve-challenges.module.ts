import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveChallengesPageRoutingModule } from './approve-challenges-routing.module';

import { ApproveChallengesPage } from './approve-challenges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveChallengesPageRoutingModule
  ],
  declarations: [ApproveChallengesPage]
})
export class ApproveChallengesPageModule {}
