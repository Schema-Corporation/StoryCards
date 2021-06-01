import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluateAnswersPageRoutingModule } from './evaluate-answers-routing.module';

import { EvaluateAnswersPage } from './evaluate-answers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluateAnswersPageRoutingModule
  ],
  declarations: [EvaluateAnswersPage]
})
export class EvaluateAnswersPageModule {}
