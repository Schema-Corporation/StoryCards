import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestTurnPage } from './guest-turn.page';

const routes: Routes = [
  {
    path: '',
    component: GuestTurnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestTurnPageRoutingModule {}
