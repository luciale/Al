import { Component, OnInit } from '@angular/core';
import {FirebaseauthService} from '../services/firebaseauth.service';
import {FirestoreService} from '../services/firestore.service';
import {Usuario} from '../models';
import {Router} from '@angular/router';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  isPro = false;
  us: any = {};
  ingresado: boolean;
  constructor(public firebaseauthService: FirebaseauthService,private firestore: FirestoreService,
    private router: Router, private payments: PaymentService) { }

  async ngOnInit() {
    this.isPro = await this.payments.getPro();
    await this.firebaseauthService.stateAuth().subscribe(res =>{
      if(res!= null){
        this.ingresado=true;
        this.firestore.getCollection1<Usuario>('Usuario').subscribe( res1 => {
          for(let i= 0; i< res1.length; i++){
            if(res1[i].email== res.email){
          
             this.us= res1[i]
             console.log(this.us)
            }
          }
        })
   
   
    
   
      }else{
        this.ingresado=false;
      }
    })
    }
    async salir(){
      await this.firebaseauthService.logut();
      window.location.reload()
      //this.router.navigate(['/login'])

    }
    async eliminar(){
      await this.firebaseauthService.delete();
      window.location.reload()
      
    }
    
    goPay(){
      this.router.navigate(['/payment'])
    }

    goLogin(){
      this.router.navigate(['/login'])
    }
    goRegistro(){
      this.router.navigate(['/registro'])
    }
  }
