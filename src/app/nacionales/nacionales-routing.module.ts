import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NacionalesPage } from './nacionales.page';

const routes: Routes = [
  {
    path: '',
    component: NacionalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NacionalesPageRoutingModule {}
