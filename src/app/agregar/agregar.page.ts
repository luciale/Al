import { Component, OnInit } from '@angular/core';

import { ImagePicker, ImagePickerOptions } from '@awesome-cordova-plugins/image-picker/ngx';
import { ActionSheetController, AlertController } from '@ionic/angular';
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
  imagen_direccion1: any;
  imagen_direccion2: any;
  imagen_direccion3: any;
  url: any;
  tipo: any;
  newImage ='';
  newImage1 ='';
  newImage2 ='';
  newImage3 ='';
  newFile= '';
  newFile1= '';
  newFile2= '';
  newFile3= '';
  old_id: any;
  securepath: any = window;
  private file:any= File;
  loading: any;
  toast: any;
  color: string = '#d435a2';
  categoria: string = 'Categoria';
  cant_imagenes= 0;
  en_portada= 0;
  en_portadatxt= 'Agregar a portada?'
  public modulesQuill = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ font:[]  as any[]}],
      [{ color: []  as any[]}, 
      { background: []  as any[]}],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] as any[] }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered'}, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
    ]
  };
  public htmlContent: any;
  constructor(
    
    public fb: FormBuilder,
    private plt: Platform,
		private http: HttpClient,
		private toastController: ToastController,
    private alertController: AlertController,
		private firestore: FirestoreService,
    public loadingController: LoadingController,
     private imagepicker: ImagePicker, public actionSheetController: ActionSheetController,public firebaseauthService: FirebaseauthService) {
      this.formularioRegistro = this.fb.group({
        'title': new FormControl("", Validators.required),
        'descripcion': new FormControl("", Validators.required),
        'detalles': new FormControl("", Validators.required),
        'imagen': new FormControl("", Validators.required),
        'autor': new FormControl("", Validators.required),
        'au_im': new FormControl("", Validators.required),
        'au_im1': new FormControl("", Validators.required),
        'au_im2': new FormControl("", Validators.required),
        'au_im3': new FormControl("", Validators.required),
      });
      
      }


  ngOnInit() {
    this.getNoticias()
    this.categoria= 'Categoria'
	
  }
  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Categoría',
      inputs: [
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
            this.categoria= 'Tendencias',
            this.tipo= '5'
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



 async Guardar(){
  this.presentLoading()
   this.submitForm().then( res =>{
    this.loading.dismiss();
    this.presentToast();
    this.formularioRegistro = this.fb.group({
      'title': new FormControl("", Validators.required),
      'descripcion': new FormControl("", Validators.required),
      'detalles': new FormControl("", Validators.required),
      'imagen': new FormControl("", Validators.required),
      'autor': new FormControl("", Validators.required),
      'au_im': new FormControl("", Validators.required),
      'au_im1': new FormControl("", Validators.required),
      'au_im2': new FormControl("", Validators.required),
      'au_im3': new FormControl("", Validators.required),
    });
    this.newImage='';
    this.newImage1='';
    this.newImage2='';
    this.newImage3='';
   }).catch(error =>{

   })
 }
  async submitForm() {
  
	var f = this.formularioRegistro.value;
	
	const path = 'Noticias'
	const name=  f.title;

	const res = await this.firestore.uploadImage(this.newFile,path,name);
	this.imagen_direccion= res;

  if(this.newFile1!= ''){
    const path = 'Noticias1'
    const res = await this.firestore.uploadImage(this.newFile1,path,name);
	this.imagen_direccion1= res;
  }else{
    this.imagen_direccion1= null;
  }
  if(this.newFile2!= ''){
    const path = 'Noticias2'
    const res = await this.firestore.uploadImage(this.newFile2,path,name);
	this.imagen_direccion2= res;
  }else{
    this.imagen_direccion2= null;
  }
	
  if(this.newFile3!= ''){
    const path = 'Noticias3'
    const res = await this.firestore.uploadImage(this.newFile1,path,name);
	this.imagen_direccion3= res;
  }
  else{
    this.imagen_direccion3= null;
  }
  
	
    var noticia = {
		id: this.firestore.getId(),
	  title: f.title,
	  description :f.descripcion,
	  details: f.detalles,
	  image: this.imagen_direccion,
	  type: this.tipo,
	  fecha: new Date(),
    autor: f.autor,
    image1: this.imagen_direccion1,
    image2: this.imagen_direccion2,
    image3: this.imagen_direccion3,
    au_im: 'Fotografía tomada por: ' + f.au_im,
    au_im1: 'Fotografía tomada por: ' + f.au_im1,
    au_im2: 'Fotografía tomada por: ' + f.au_im2,
    au_im3: 'Fotografía tomada por: ' + f.au_im3,
    }
  


  

  
 await this.firestore.createDoc(noticia, 'Noticias/',noticia.id);

 if(this.tipo!=6 && this.en_portada==1){
   await this.firestore.createDoc(noticia, 'Ultima/',noticia.id);
 }


	
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

  async newImageU1(event:any){
    if(event.target.files && event.target.files[0]){
      this.newFile1= event.target.files[0];
      const reader = new FileReader();
      reader.onload =((image) => {
        this.newImage1= image.target.result as string;
      
      });
      reader.readAsDataURL(event.target.files[0]);
    }
    }
  
    async newImageU2(event:any){
      if(event.target.files && event.target.files[0]){
        this.newFile2= event.target.files[0];
        const reader = new FileReader();
        reader.onload =((image) => {
          this.newImage2= image.target.result as string;
        
        });
        reader.readAsDataURL(event.target.files[0]);
      }
      }

      async newImageU3(event:any){
        if(event.target.files && event.target.files[0]){
          this.newFile3= event.target.files[0];
          const reader = new FileReader();
          reader.onload =((image) => {
            this.newImage3= image.target.result as string;
          
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
      if(this.cant_imagenes===0){
        this.newImage= ''
        this.newFile= ''
        this.cant_imagenes = 0
      }
      if(this.cant_imagenes===1){
        this.newImage1= ''
        this.newFile1= ''
        this.cant_imagenes = this.cant_imagenes -1
      }
      if(this.cant_imagenes===2){
        this.newImage2= ''
        this.newFile2= ''
        this.cant_imagenes = this.cant_imagenes -1
      }
      if(this.cant_imagenes===3){
        this.newImage3= ''
        this.newFile3= ''
        this.cant_imagenes = this.cant_imagenes -1
      }

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

    async agregarImagen(){
      if(this.cant_imagenes< 4){
        this.cant_imagenes = this.cant_imagenes +1; 
      }
    
    }
    onChangedEditor(event: any): void {
      if (event.html) {
          this.htmlContent = event.html;
        }
    }

    async presentAlertRadio1() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Agregar a Portada',
        inputs: [
          {
            name: 'Si',
            type: 'radio',
            label: 'Si',
            value: '1',
            handler: () => {
              this.en_portadatxt = 'SI Agregar a la Portada'
             this.en_portada = 1
            },
          },
          {
            name: 'No',
            type: 'radio',
            label: 'No',
            value: '2',
            handler: () => {
              this.en_portadatxt = 'NO Agregar a la Portada'
              this.en_portada = 0
            },
          },
          
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.en_portadatxt = 'Agregar a la portada?'
              this.en_portada= 0
            },
          },
          {
            text: 'Ok',
            handler: data => {
              this.en_portada= data
        
            },
          },
        ],
      });
  
      await alert.present();
    }
  
 }
