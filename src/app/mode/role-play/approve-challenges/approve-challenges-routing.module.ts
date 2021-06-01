import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproveChallengesPage } from './approve-challenges.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveChallengesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveChallengesPageRoutingModule {}
