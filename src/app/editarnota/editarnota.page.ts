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
import {ActivatedRoute, Params} from '@angular/router';
import {Noticia} from '../models';
@Component({
  selector: 'app-editarnota',
  templateUrl: './editarnota.page.html',
  styleUrls: ['./editarnota.page.scss'],
})
export class EditarnotaPage implements OnInit {
  id: any;
  formularioRegistro: FormGroup;
  genero = '0';
  loading: any;
  toast: any;
  creado= 1;
  new_u: any;
  type_title : any;
  constructor(public fb: FormBuilder,  public alertController: AlertController ,public firebaseauthService: FirebaseauthService,
    private firestore: FirestoreService,
    public loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    ) { 
    this.formularioRegistro = this.fb.group({
      'title': new FormControl("", Validators.required),
      'descripcion': new FormControl("", Validators.required),
      'detalles': new FormControl("", Validators.required),
      'autor': new FormControl("", Validators.required),
    });
  }

  async ngOnInit() {
    this.id= this.route.snapshot.paramMap.get("id")
    await this.getNoticia(this.id)
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
        'title': new FormControl("", Validators.required),
        'descripcion': new FormControl("", Validators.required),
        'detalles': new FormControl("", Validators.required),
        'autor': new FormControl("", Validators.required),
       });
      }).catch(error =>{
   
      })
    }
    
  }
  async  submitForm(){
  
    var f = this.formularioRegistro.value;
    const path = 'Noticias'
    const name=  f.title;
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

    var noticia = {
      id: this.id,
      title: f.title,
      description :f.descripcion,
      details: f.detalles,
      image: this.new_u.image,
      type: this.new_u.type,
      fecha: new Date(),
      autor: f.autor,
      image1: this.new_u.image1,
      image2: this.new_u.image2,
      image3: this.new_u.image3,
      au_im: this.new_u.au_im,
      au_im1: this.new_u.au_im1,
      au_im2: this.new_u.au_im2,
      au_im3: this.new_u.au_im3,
      }

      await this.firestore.updateDoc(noticia,'Noticias/', noticia.id)
      await this.firestore.updateDoc(noticia,'Ultima/', noticia.id)
    
   
    

  }
 
  

  async presentLoading(){
    this.loading = await this.loadingController.create({
      message: 'Actualizando noticia...',
      duration:2000
    });
    await this.loading.present();
   
  }
  async presentToast(){
      this.toast= await this.toastController.create({
        message: 'Noticia actualizada exitosamente',
        duration:2000
      });
      this.toast.present();
  }
  async getNoticia(id: any){
    this.new_u = this.firestore.getDoc('Noticias',id);
   await this.firestore.getCollection1<Noticia>('Noticias').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].id==id){
     
          this.new_u=(res[i])
          this.formularioRegistro = this.fb.group({
            'title': res[i].title,
            'descripcion': res[i].description,
            'detalles': res[i].details,
            'autor': res[i].autor,
          });
          }
          this.type_title = this.getType(this.new_u.type);
        }
      })
    }
    getType(type: any){
      if(type==1){
        return "Nacionales"
      }if(type==2){
        return "Internacionales"
      }if(type==3){
        return "Deportes"
      }if(type==4){
        return "Farándula y Espectáculo"
      }if(type==5){
        return "Tendencias"
      }
      return null
    }
   
  }

