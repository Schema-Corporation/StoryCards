import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluateAnswersPage } from './evaluate-answers.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluateAnswersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluateAnswersPageRoutingModule {}
