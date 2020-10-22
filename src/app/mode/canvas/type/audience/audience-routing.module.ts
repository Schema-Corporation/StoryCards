import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudiencePage } from './audience.page';

const routes: Routes = [
  {
    path: '',
    component: AudiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudiencePageRoutingModule {}
