import { Component, OnInit } from '@angular/core';

import { ImagePicker, ImagePickerOptions } from '@awesome-cordova-plugins/image-picker/ngx';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import {FirestoreService} from '../services/firestore.service';
import {Noticia} from '../models';
import {FirebaseauthService} from '../services/firebaseauth.service'
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {map} from 'rxjs/operators'
const IMAGE_DIR = 'stored-images';

interface LocalFile {
	name: string;
	path: string;
	data: string;
}
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  formularioRegistro: FormGroup;
  news : any = [];
  imagen_direccion: any;
  url: any;
  tipo: any;
  newImage ='';
  newFile= '';
  old_id: any;
  securepath: any = window;
  private file:any= File;
  loading: any;
  toast: any;
  constructor(
    public fb: FormBuilder,
    private plt: Platform,
		private http: HttpClient,
		private toastController: ToastController,
		private firestore: FirestoreService,
    public loadingController: LoadingController,
     private imagepicker: ImagePicker, public actionSheetController: ActionSheetController,public firebaseauthService: FirebaseauthService) {
      this.formularioRegistro = this.fb.group({
        'title': new FormControl("", Validators.required),
        'descripcion': new FormControl("", Validators.required),
        'detalles': new FormControl("", Validators.required),
        'imagen': new FormControl("", Validators.required)
      });
      }


  ngOnInit() {
    this.getNoticias()
	
  }

 async Guardar(){
  this.presentLoading()
   this.submitForm().then( res =>{
    this.loading.dismiss();
    this.presentToast();
    this.formularioRegistro = this.fb.group({
      'title': new FormControl("", Validators.required),
      'descripcion': new FormControl("", Validators.required),
      'detalles': new FormControl("", Validators.required),
      'imagen': new FormControl("", Validators.required)
    });
    this.newImage='';
   }).catch(error =>{

   })
 }
  async submitForm() {
  
	var f = this.formularioRegistro.value;
	
	const path = 'Noticias'
	const name=  f.title;

	const res = await this.firestore.uploadImage(this.newFile,path,name);
	this.imagen_direccion= res;
	
	
    var noticia = {
		id: this.firestore.getId(),
	  title: f.title,
	  description :f.descripcion,
	  details: f.detalles,
	  image: this.imagen_direccion,
	  type: this.tipo,
	  fecha: new Date()
    }
    
    for(let i =0; i< this.news.length;i++){
     if(this.news[i].type== this.tipo){
      await this.firestore.deleteDoc('Ultima',this.news[i].id);
     }
    }
	await this.firestore.createDoc(noticia, 'Noticias/',noticia.id);


	await this.firestore.createDoc(noticia, 'Ultima',noticia.id);
  
  //
 
	
  }
  async DELT(tipo: any){
    await this.firestore.getCollection1<Noticia>('Ultima').subscribe( rest => {
      for(let i= 0; i< rest.length; i++){
        if(rest[i].type==tipo){
         
         this.old_id= rest[i].id;
   
        }
      }
    })
  }
  

 async  getNoticias(){

    this.firestore.getCollection1<Noticia>('Ultima').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        this.news = res
        
      }
    })
    
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

  getNews(){
    return this.http
      .get("assets/models/new_t.json")
      .pipe(
        map((res:any) => {
          return res.data;
        })
      )
    }
    async Eliminar(){
      console.log("se va a eliminar")
    }
	async handleChange(e:any){
		this.tipo= e.detail.value
  
	  }
    async presentLoading(){
      this.loading = await this.loadingController.create({
        message: 'Guardando Noticia...'
      });
      await this.loading.present();
     
    }

    async presentToast(){
      this.toast= await this.toastController.create({
        message: 'Noticia agregada exitosamente',
        duration:2000
      });
      this.toast.present();
    }
    async salir(){
      this.firebaseauthService.logut();
    }
 }
