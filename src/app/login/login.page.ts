import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import {FirestoreService} from '../services/firestore.service';
import {FirebaseauthService} from '../services/firebaseauth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  uid: any;
  constructor(public fb: FormBuilder, public alertController: AlertController,
    public navCtrl: NavController,
    private firestore: FirestoreService,
    public firebaseauthService: FirebaseauthService) {
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
   }

  async ngOnInit() {
    this.uid = await this.firebaseauthService.getUid();
    if(this.uid!= null){

    }else{}
  }
  async ingresar(){
    var f = this.formularioLogin.value;

    const res = await this.firebaseauthService.login(f.correo,f.password);
    this.uid = await this.firebaseauthService.getUid();
    if(this.uid!= null){

    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }


/*
    if(usuario.nombre == f.nombre && usuario.password == f.password){
      localStorage.setItem('ingresado','true');
      this.navCtrl.navigateRoot('menu/inicio');
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }*/
  }
  async salir(){
    this.firebaseauthService.logut();
  }
}
