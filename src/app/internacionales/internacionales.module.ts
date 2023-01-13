import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternacionalesPageRoutingModule } from './internacionales-routing.module';

import { InternacionalesPage } from './internacionales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternacionalesPageRoutingModule
  ],
  declarations: [InternacionalesPage]
})
export class InternacionalesPageModule {}
