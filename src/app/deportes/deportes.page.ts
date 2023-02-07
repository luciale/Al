import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firestore.service';
import {Noticia} from '../models';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
import {FirebaseauthService} from '../services/firebaseauth.service';
@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.page.html',
  styleUrls: ['./deportes.page.scss'],
})
export class DeportesPage implements OnInit {
  news : Noticia[] = [];
  ingresado: boolean;
  handlerMessage = '';
  roleMessage = '';
  toast: any;
  constructor( private firestore: FirestoreService,private alertController: AlertController,  private router: Router,
    private toastController: ToastController,public firebaseauthService: FirebaseauthService) { }

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
  }
  getNoticias(){
    this.firestore.getCollection1<Noticia>('Noticias').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].type== "3"){
          this.news.push(res[i])
        }
      }
    })
    
  }
  async Eliminar(id:any){
    const alert = await this.alertController.create({
      header: 'Desea eliminar la noticia?',
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
}
