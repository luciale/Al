import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternacionalesPage } from './internacionales.page';

const routes: Routes = [
  {
    path: '',
    component: InternacionalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternacionalesPageRoutingModule {}
