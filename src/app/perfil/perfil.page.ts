import { Component, OnInit } from '@angular/core';
import {FirebaseauthService} from '../services/firebaseauth.service';
import {FirestoreService} from '../services/firestore.service';
import {Usuario} from '../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  us: any = {};
  constructor(public firebaseauthService: FirebaseauthService,private firestore: FirestoreService,
    private router: Router) { }

  async ngOnInit() {
    await this.firebaseauthService.stateAuth().subscribe(res =>{
      if(res!= null){
        console.log(res.email)
        this.firestore.getCollection1<Usuario>('Usuario').subscribe( res1 => {
          for(let i= 0; i< res1.length; i++){
            if(res1[i].email== res.email){
          
             this.us= res1[i]
             console.log(this.us)
            }
          }
        })
   
   
    
   
      }else{
      
      }
    })
    }
    async salir(){
      this.firebaseauthService.logut();
      this.router.navigate(['/ultima'])

    }
  }
