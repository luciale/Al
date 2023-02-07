import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import {FirestoreService} from '../services/firestore.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  constructor(public fb: FormBuilder, public alertController: AlertController,
    public navCtrl: NavController,
    private firestore: FirestoreService) {
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
  }
  async ingresar(){
    var f = this.formularioLogin.value;
  
    var usuario =JSON.parse(localStorage.getItem('usuario') as string);

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
    }
  }
  getUsuarios(){
    this.firestore.getCollection()
  }
}
