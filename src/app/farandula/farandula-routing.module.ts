import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarandulaPage } from './farandula.page';

const routes: Routes = [
  {
    path: '',
    component: FarandulaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarandulaPageRoutingModule {}
