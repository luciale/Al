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
import {FirestoreService} from '../services/firestore.service';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import {Router} from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;
  genero = '0';
  loading: any;
  toast: any;
  creado= 1;
  constructor(public fb: FormBuilder,  public alertController: AlertController ,public firebaseauthService: FirebaseauthService,
    private firestore: FirestoreService,
    public loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router,
    ) { 
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  async ngOnInit() {
    const uid= await this.firebaseauthService.getUid();
    console.log(uid)
  }


  async guardar(){
    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar'],  
        cssClass: 'alertCustomCss',
      });
  
      await alert.present();
      return;
    }else{
      this.presentLoading()
      this.submitForm().then( res =>{
       this.loading.dismiss();
       this.presentToast();
       this.formularioRegistro = this.fb.group({
         'nombre': new FormControl("", Validators.required),
         'correo': new FormControl("", Validators.required),
         'password': new FormControl("", Validators.required)
       });
      }).catch(error =>{
   
      })
    }
    
  }
  async  submitForm(){
  
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
      nombre: f.nombre,
      genero: this.genero,
      email: f.correo,
      type: 1,
      id: this.firestore.getId(),
    }
 
    const res= await this.firebaseauthService.registrar(usuario.email,f.password,usuario)
    const r = await this.firebaseauthService.getUid();
    if(res != null){
      this.creado=1
       return;
    }else{
      this.creado=0;
     
 
      return;
    }
    

  }
  async salir(){
    this.firebaseauthService.logut();
  }
  
  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
      inputs: [
        {
          name: 'Femenino',
          type: 'radio',
          label: 'Femenino',
          value: '0',
          handler: () => {
           this.genero= '0'
          },
        },
        {
          name: 'Masculino',
          type: 'radio',
          label: 'Masculino',
          value: '1',
          handler: () => {
            this.genero= '1'
          },
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.genero= '0'
          },
        },
        {
          text: 'Ok',
          handler: data => {
            this.genero= data
      
          },
        },
      ],
    });

    await alert.present();
  }

  async presentLoading(){
    this.loading = await this.loadingController.create({
      message: 'Guardando datos de usuario...',
      duration:2000
    });
    await this.loading.present();
   
  }
  async presentToast(){
      this.toast= await this.toastController.create({
        message: 'Usuario creado exitosamente',
        duration:2000
      });
      this.toast.present();
  }
}
