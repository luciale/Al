import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuponesPageRoutingModule } from './cupones-routing.module';

import { CuponesPage } from './cupones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuponesPageRoutingModule
  ],
  declarations: [CuponesPage]
})
export class CuponesPageModule {}
