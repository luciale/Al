import { Component, OnInit } from '@angular/core';
import {Publicidad} from '../models';
import {FirestoreService} from '../services/firestore.service';
import {FirebaseauthService} from '../services/firebaseauth.service';
import {  AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.page.html',
  styleUrls: ['./cupones.page.scss'],
})
export class CuponesPage implements OnInit {
  news : Publicidad[] = [];
  ingresado: boolean;
  toast: any;
  constructor(public firebaseauthService: FirebaseauthService,private firestore: FirestoreService,private alertController: AlertController,private toastController: ToastController) { }

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
  getNoticias(){
    this.firestore.getCollection1<Publicidad>('Publicidad').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].type== "6"){
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
  async presentToast(mess:string){
    this.toast= await this.toastController.create({
      message: mess,
      duration:2000
    });
    this.toast.present();
  }
  async Eliminar(id:any){
    
    const alert = await this.alertController.create({
      header: 'Desea eliminar el cupón?',
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
