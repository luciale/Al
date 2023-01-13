import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UltimaPageRoutingModule } from './ultima-routing.module';

import { UltimaPage } from './ultima.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UltimaPageRoutingModule
  ],
  declarations: [UltimaPage]
})
export class UltimaPageModule {}
