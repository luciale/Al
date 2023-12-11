import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firestore.service';
import {Noticia,Publicidad} from '../models';
import { ToastController } from '@ionic/angular';
import {FirebaseauthService} from '../services/firebaseauth.service';
import { AlertController } from '@ionic/angular';
import {Usuario} from '../../app/models';
@Component({
  selector: 'app-farandula',
  templateUrl: './farandula.page.html',
  styleUrls: ['./farandula.page.scss'],
})
export class FarandulaPage implements OnInit {
  news : Noticia[] = [];
  ingresado: boolean;
  toast: any;
  publicidad : Array<Publicidad>;
  baners :  Array<Publicidad>;
  pub: any = {};
  ban: any= {}
  vista= true;
  vista1= true;
  constructor( private firestore: FirestoreService,private alertController: AlertController,private toastController: ToastController,public firebaseauthService: FirebaseauthService) { }

 async ngOnInit() {
    this.getNoticias()
    await this.firebaseauthService.stateAuth().subscribe(res =>{
      if(res!= null){
        this.firestore.getCollection1<Usuario>('Usuario').subscribe( res1 => {
          for(let i= 0; i< res1.length; i++){
            if(res1[i].email== res.email){
            
             var tipo= Number(res1[i].type)
             if(tipo ===1){
              this.ingresado= true;
             }
             else{ this.ingresado = false;}
            }
          }
        
        })
     
      }else{
        this.ingresado= false;
      }
    })
    this.getPublicidad()
   
    this.getBaners()
  }
  getNoticias(){
    this.firestore.getCollection1<Noticia>('Noticias').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].type== "4"){
          this.news.push(res[i])
        }
      }
      this.news.sort(function (a, b) {
        if (a.fecha < b.fecha) {
          return 1;
        }
        if (a.fecha > b.fecha) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    })
    
  }
  async Eliminar(id:any){
    const alert = await this.alertController.create({
      header: 'Desea eliminar la noticia?',
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
           this.firestore.deleteDoc('Noticias/',id).then(res =>{
            this.presentToast('Eliminado con éxito');
            this.alertController.dismiss();
            window.location.reload()
           }).catch(error=>{
            this.presentToast('No se pudo eliminar')
           })
           
          },
        },
      ],
    });

    await alert.present();

    

  }
  async presentToast(mess:string){
    this.toast= await this.toastController.create({
      message: mess,
      duration:2000
    });
    this.toast.present();
  }
  getPublicidad(){
    this.publicidad=[];
    let v= 0;
    this.firestore.getCollection1<Publicidad>('Publicidad').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].type== "4"){
        
            // get the input value
            this.publicidad.push(res[i]);
          

        
     
        }
      }
      if(this.publicidad.length==0){
        this.vista=false;
      }
      let v = this.getRandomInt(0,this.publicidad.length);
      this.pub= this.publicidad[v];
    })


    
  }
  getBaners(){
    this.baners=[];
    let v= 0;
    this.firestore.getCollection1<Publicidad>('Baner').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].type== "4"){
          this.baners.push(res[i])
        }
      }
      if(this.baners.length==0){
        this.vista1=false;
      }
     
      let v = this.getRandomInt(0,this.publicidad.length);
      this.ban= this.baners[v];
   
    })
    
  }

   getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  async close(){
    this.vista= false;
    await this.getBaners();

  }
}

