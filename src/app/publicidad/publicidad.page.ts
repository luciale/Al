import { Component, OnInit } from '@angular/core';
import {
FormBuilder,
FormGroup,
Validators,
FormControl
} from '@angular/forms';
import {FirestoreService} from '../services/firestore.service';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { ActionSheetController, AlertController } from '@ionic/angular';
import {Publicidad} from '../models';
import {FirebaseauthService} from '../services/firebaseauth.service';
@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.page.html',
  styleUrls: ['./publicidad.page.scss'],
})
export class PublicidadPage implements OnInit {
  newFile= '';
  newImage ='';
  loading: any;
  toast: any;
  formularioRegistro: FormGroup;
  imagen_direccion: any;
  categoria: string = 'Categoria';
  tipo: any;
  news : Publicidad[] = [];
  ingresado: boolean;
  constructor(  public firebaseauthService: FirebaseauthService, private alertController: AlertController, public fb: FormBuilder,	private firestore: FirestoreService,    public loadingController: LoadingController,		private toastController: ToastController,) { 
    this.formularioRegistro = this.fb.group({
      'imagen': new FormControl("", Validators.required)
    });
  }

  async ngOnInit() {
    await this.firebaseauthService.stateAuth().subscribe(res =>{
      console.log(res)
      if(res!= null){
        this.ingresado=true;
        console.log(this.ingresado)
      }else{
        this.ingresado= false;
        console.log(this.ingresado)
      }
    })
    this.getNoticias()
  }
  async newImageU(event:any){
    if(event.target.files && event.target.files[0]){
      this.newFile= event.target.files[0];
      const reader = new FileReader();
      reader.onload =((image) => {
        this.newImage= image.target.result as string;
      
      });
      reader.readAsDataURL(event.target.files[0]);
    }
    }
    async submitForm() {
  
      var f = this.formularioRegistro.value;
      
      const path = 'Publicidad'
      const name=  f.title;
    
      const res = await this.firestore.uploadImage(this.newFile,path,this.firestore.getId());
      this.imagen_direccion= res;
      
      
        var publicidad = {
        id: this.firestore.getId(),
        image: this.imagen_direccion,
        fecha: new Date(),
        type: this.tipo
        }
    
      await this.firestore.createDoc(publicidad, 'Publicidad/',publicidad.id);
    
    
   
      
      //
     
      
      }

      async presentLoading(){
        this.loading = await this.loadingController.create({
          message: 'Guardando Publicidad...'
        });
        await this.loading.present();
       
      }

   

      async presentToast(mess:string){
        this.toast= await this.toastController.create({
          message: mess,
          duration:2000
        });
        this.toast.present();
      }
    async Guardar(){
      this.presentLoading()
      this.submitForm().then( res =>{
        this.loading.dismiss();
        this.presentToast('Publicidad agregada exitosamente');
        this.formularioRegistro = this.fb.group({
          'imagen': new FormControl("", Validators.required)
        });
        this.newImage='';
       }).catch(error =>{
    
       })
  
     }

     async presentAlertRadio() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Radio',
        inputs: [
          {
            name: 'Portada',
            type: 'radio',
            label: 'Portada',
            value: '1',
            handler: () => {
             this.categoria= 'Portada'
             this.tipo= '7'
            },
          },
          {
            name: 'Nacionales',
            type: 'radio',
            label: 'Nacionales',
            value: '1',
            handler: () => {
             this.categoria= 'Nacionales'
             this.tipo= '1'
            },
          },
          {
            name: 'Internacionales',
            type: 'radio',
            label: 'Internacionales',
            value: '2',
            handler: () => {
              this.categoria= 'Internacionales',
              this.tipo= '2'
            },
          },
          {
            name: 'Deportes',
            type: 'radio',
            label: 'Deportes',
            value: '3',
            handler: () => {
              this.categoria= 'Deportes',
              this.tipo= '3'
            },
          },
          {
            name: 'Farandula',
            type: 'radio',
            label: 'Farándula y Espectaculo',
            value: '4',
            handler: () => {
              this.categoria= 'Farándula y Espectaculo',
              this.tipo= '4'
            },
          },
          {
            name: 'Tendencias',
            type: 'radio',
            label: 'Tendencias',
            value: '5',
            handler: () => {
              this.categoria= 'Tendencias'
              this.tipo= '5'
            },
          },
          {
            name: 'Cupones',
            type: 'radio',
            label: 'Cupones',
            value: '6',
            handler: () => {
              this.categoria= 'Cupones'
              this.tipo= '6'
            },
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.categoria= 'Categoria'
            },
          },
          {
            text: 'Ok',
            handler: data => {
              this.tipo= data
        
            },
          },
        ],
      });
  
      await alert.present();
    }

    getNoticias(){
      this.firestore.getCollection1<Publicidad>('Publicidad').subscribe( res => {
        this.news = res
      })
      
    }
  
    
    async Eliminar(id:any){
      const alert = await this.alertController.create({
        header: 'Desea eliminar la publicidad?',
        cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.alertController.dismiss();
            },
          },
          {
            text: 'Eliminar',
            role: 'confirm',
            handler: () => {
             this.firestore.deleteDoc('Publicidad/',id).then(res =>{
              this.presentToast('Eliminado con éxito');
              this.alertController.dismiss();
             }).catch(error=>{
              this.presentToast('No se pudo eliminar')
             })
             
            },
          },
        ],
      });
  
      await alert.present();
  
      
  
    }
    
}
