import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NacionalesPageRoutingModule } from './nacionales-routing.module';

import { NacionalesPage } from './nacionales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NacionalesPageRoutingModule
  ],
  declarations: [NacionalesPage]
})
export class NacionalesPageModule {}
