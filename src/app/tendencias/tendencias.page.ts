import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firestore.service';
import {Noticia, Publicidad} from '../models';
import { ToastController } from '@ionic/angular';
import {FirebaseauthService} from '../services/firebaseauth.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.page.html',
  styleUrls: ['./tendencias.page.scss'],
})
export class TendenciasPage implements OnInit {
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
      console.log(res)
      if(res!= null){
        this.ingresado=true;
        console.log(this.ingresado)
      }else{
        this.ingresado= false;
        console.log(this.ingresado)
      }
    })
    this.getPublicidad()
   
    this.getBaners()
 
   
  }
  getNoticias(){
    this.firestore.getCollection1<Noticia>('Noticias').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].type== "5"){
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
        if(res[i].type== "5"){
        
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
        if(res[i].type== "5"){
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


