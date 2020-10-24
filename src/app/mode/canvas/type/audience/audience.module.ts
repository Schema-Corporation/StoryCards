import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudiencePageRoutingModule } from './audience-routing.module';

import { AudiencePage } from './audience.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudiencePageRoutingModule
  ],
  declarations: [AudiencePage]
})
export class AudiencePageModule {}
