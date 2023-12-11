import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AgregarPageRoutingModule } from './agregar-routing.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AgregarPage } from './agregar.page';

import { FileUploadOptions,FileTransferObject ,FileTransfer }  from '@awesome-cordova-plugins/file-transfer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AgregarPage],
  providers: [FileTransfer]
})
export class AgregarPageModule {}