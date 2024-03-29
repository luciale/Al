import { Component } from '@angular/core';
import {FirebaseauthService} from '../app/services/firebaseauth.service';
import {FirestoreService} from '../app/services/firestore.service';
import {Usuario} from '../app/models';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  ingresado: boolean;
  tipo: number = 0
  async ngOnInit() {
    
    await this.firebaseauthService.stateAuth().subscribe(res =>{
      if(res!= null){
        this.firestore.getCollection1<Usuario>('Usuario').subscribe( res1 => {
          for(let i= 0; i< res1.length; i++){
            if(res1[i].email== res.email){
          
             this.tipo= Number(res1[i].type)
            }
          }
        
        })
   
   
        this.ingresado=true;
   
      }else{
        this.ingresado= false;
        this.tipo= 0
   
      }
    })
   
  }

  public appPages = [
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Portada', url: '/ultima', icon: 'time' },
    { title: 'Nacionales', url: '/nacionales', icon: 'newspaper' },
    { title: 'Internacionales', url: '/internacionales', icon: 'globe' },
    { title: 'Deportes', url: '/deportes', icon: 'football' },
    { title: 'Farándula', url: '/farandula', icon: 'star' },
    { title: 'Tendencias', url: '/tendencias', icon: 'trending-up' },
    { title: 'Cupones', url: '/cupones', icon: 'gift' },
    { title: 'Contáctanos', url: '/about', icon: 'mail' },
    { title: 'Registrar Noticia', url: '/agregar', icon: 'add' },
    { title: 'Agregar Publicidad', url: '/publicidad', icon: 'add' },
    { title: 'Agregar Baner', url: '/baners', icon: 'add' },
    { title: 'Términos y Condiciones', url: '/terminos', icon: 'document-text' },

  ];
  public appPages1 = [
    { title: 'Iniciar Sesión', url: '/login', icon: 'log-in'},
    { title: 'Portada', url: '/ultima', icon: 'time' },
    { title: 'Nacionales', url: '/nacionales', icon: 'newspaper' },
    { title: 'Internacionales', url: '/internacionales', icon: 'globe' },
    { title: 'Deportes', url: '/deportes', icon: 'football' },
    { title: 'Farándula', url: '/farandula', icon: 'star' },
    { title: 'Tendencias', url: '/tendencias', icon: 'trending-up' },
    { title: 'Cupones', url: '/cupones', icon: 'gift' },
    { title: 'Contáctanos', url: '/about', icon: 'mail' },
    { title: 'Términos y Condiciones', url: '/terminos', icon: 'document-text' },
   
  ];
  public appPages2 = [
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Portada', url: '/ultima', icon: 'time' },
    { title: 'Nacionales', url: '/nacionales', icon: 'newspaper' },
    { title: 'Internacionales', url: '/internacionales', icon: 'globe' },
    { title: 'Deportes', url: '/deportes', icon: 'football' },
    { title: 'Farándula', url: '/farandula', icon: 'star' },
    { title: 'Tendencias', url: '/tendencias', icon: 'trending-up' },
    { title: 'Cupones', url: '/cupones', icon: 'gift' },
    { title: 'Contáctanos', url: '/about', icon: 'mail' },
    { title: 'Términos y Condiciones', url: '/terminos', icon: 'document-text' },
   
  ];

  constructor( public firebaseauthService: FirebaseauthService,private firestore: FirestoreService, changeDetectorRef: ChangeDetectorRef,) {}
   
  

}


