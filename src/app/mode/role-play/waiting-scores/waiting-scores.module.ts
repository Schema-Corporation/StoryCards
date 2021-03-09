import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitingScoresPageRoutingModule } from './waiting-scores-routing.module';

import { WaitingScoresPage } from './waiting-scores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitingScoresPageRoutingModule
  ],
  declarations: [WaitingScoresPage]
})
export class WaitingScoresPageModule {}
