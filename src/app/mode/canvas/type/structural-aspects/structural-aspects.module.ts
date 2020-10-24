import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StructuralAspectsPageRoutingModule } from './structural-aspects-routing.module';

import { StructuralAspectsPage } from './structural-aspects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StructuralAspectsPageRoutingModule
  ],
  declarations: [StructuralAspectsPage]
})
export class StructuralAspectsPageModule {}
