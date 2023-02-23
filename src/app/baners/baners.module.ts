import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BanersPageRoutingModule } from './baners-routing.module';

import { BanersPage } from './baners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BanersPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [BanersPage]
})
export class BanersPageModule {}
