import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FirestoreService} from '../services/firestore.service';
import {Noticia} from '../models';
import { ToastController } from '@ionic/angular';
import {FirebaseauthService} from '../services/firebaseauth.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-nacionales',
  templateUrl: './nacionales.page.html',
  styleUrls: ['./nacionales.page.scss'],
})
export class NacionalesPage implements OnInit {

  news_t: any = [];
  id: any;
  new_u: any ={};
  type_title : any;
  news : Noticia[] = [];
  ingresado: boolean;
  toast: any;
  constructor(private http: HttpClient,
    private router: Router ,
    private firestore: FirestoreService,
    private alertController: AlertController,private toastController: ToastController,public firebaseauthService: FirebaseauthService) { }

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
        if(res[i].type== "1"){
          this.news.push(res[i])
        }
      }
    })
    
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