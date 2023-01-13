import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarandulaPageRoutingModule } from './farandula-routing.module';

import { FarandulaPage } from './farandula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarandulaPageRoutingModule
  ],
  declarations: [FarandulaPage]
})
export class FarandulaPageModule {}
