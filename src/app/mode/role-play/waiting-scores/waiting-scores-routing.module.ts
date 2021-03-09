import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitingScoresPage } from './waiting-scores.page';

const routes: Routes = [
  {
    path: '',
    component: WaitingScoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingScoresPageRoutingModule {}
