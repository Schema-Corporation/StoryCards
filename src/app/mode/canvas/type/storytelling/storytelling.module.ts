import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorytellingPageRoutingModule } from './storytelling-routing.module';

import { StorytellingPage } from './storytelling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorytellingPageRoutingModule
  ],
  declarations: [StorytellingPage]
})
export class StorytellingPageModule {}
