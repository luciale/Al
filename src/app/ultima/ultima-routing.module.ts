import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UltimaPage } from './ultima.page';

const routes: Routes = [
  {
    path: '',
    component: UltimaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UltimaPageRoutingModule {}
