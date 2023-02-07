import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {FirebaseauthService} from '../services/firebaseauth.service'
import { AlertController } from '@ionic/angular';
import { FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { timeStamp } from 'console';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder,  public alertController: AlertController ,public firebaseauthService: FirebaseauthService) { 
    this.formularioRegistro = this.fb.group({
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  async ngOnInit() {
    const uid= await this.firebaseauthService.getUid();
    console.log(uid)
  }

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar'],  
        cssClass: 'alertCustomCss',
      });
  
      await alert.present();
      return;
    }

    var usuario = {
      email: f.correo,
      password: f.password
    }
 
    const res= await this.firebaseauthService.registrar(usuario.email,usuario.password)
    const r = await this.firebaseauthService.getUid();
    console.log(r)

  }
  async salir(){
    this.firebaseauthService.logut();
  }
  
}
