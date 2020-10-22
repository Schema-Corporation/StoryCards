import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorytellingPage } from './storytelling.page';

const routes: Routes = [
  {
    path: '',
    component: StorytellingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorytellingPageRoutingModule {}
