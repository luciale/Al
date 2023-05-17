import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {FirestoreService} from '../services/firestore.service';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {
public creado: any;
  constructor(public auth: AngularFireAuth,
    private firestore: FirestoreService,
    private router: Router,
    ) { }
  async login(email: string, password: string){
    this.auth.signInWithEmailAndPassword(email,password).then((res)=>{
      this.router.navigate(['/ultima'])
    }).catch((error)=>{
      this.creado=0;
    })
  }
  async logut(){
    this.auth.signOut().then((res)=>{
 
    }).catch((error)=>{
      this.creado=0;
    })
  }
  async registrar(email: string, password: string, usuario: any){
    this.auth.createUserWithEmailAndPassword(email,password).then((res)=>{
      
      this.firestore.createDoc(usuario, 'Usuario/',usuario.id);
      this.router.navigate(['/ultima'])
    }).catch((error)=>{
      this.creado=0;
      
    })
  }
  async getUid(){
    const user = await this.auth.currentUser;
    if( user === null){
      return null;
    }else{
      return user.uid;
    }
  }
  stateAuth(){
    return this.auth.authState;
  }

  async getEmail(){
    const user = await this.auth.currentUser;
    if(user=== null){
      return null;
    }else{
      return user.email;
    }
  }
  async delete(){
    this.auth.currentUser.then(user => user?.delete())
  }
}
