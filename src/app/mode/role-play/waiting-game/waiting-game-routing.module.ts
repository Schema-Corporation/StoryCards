import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitingGamePage } from './waiting-game.page';

const routes: Routes = [
  {
    path: '',
    component: WaitingGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingGamePageRoutingModule {}
