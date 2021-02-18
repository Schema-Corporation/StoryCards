import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitingGuestPage } from './waiting-guest.page';

const routes: Routes = [
  {
    path: '',
    component: WaitingGuestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingGuestPageRoutingModule {}
