import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BanersPage } from './baners.page';

const routes: Routes = [
  {
    path: '',
    component: BanersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanersPageRoutingModule {}
