import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCanvasPage } from './add-canvas.page';

const routes: Routes = [
  {
    path: '',
    component: AddCanvasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCanvasPageRoutingModule {}
