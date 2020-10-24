import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StructuralAspectsPage } from './structural-aspects.page';

const routes: Routes = [
  {
    path: '',
    component: StructuralAspectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StructuralAspectsPageRoutingModule {}
