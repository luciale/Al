import { Component } from '@angular/core';
import {FirebaseauthService} from '../app/services/firebaseauth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  ingresado: boolean;
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
   
  }
  public appPages = [
    { title: 'Última Hora', url: '/ultima', icon: 'time' },
    { title: 'Nacionales', url: '/nacionales', icon: 'newspaper' },
    { title: 'Internacionales', url: '/internacionales', icon: 'globe' },
    { title: 'Deportes', url: '/deportes', icon: 'football' },
    { title: 'Farándula', url: '/farandula', icon: 'star' },
    { title: 'Tendencias', url: '/tendencias', icon: 'trending-up' },
    { title: 'Registrar Noticia', url: '/agregar', icon: 'add' },
  ];
  public appPages1 = [
    { title: 'Última Hora', url: '/ultima', icon: 'time' },
    { title: 'Nacionales', url: '/nacionales', icon: 'newspaper' },
    { title: 'Internacionales', url: '/internacionales', icon: 'globe' },
    { title: 'Deportes', url: '/deportes', icon: 'football' },
    { title: 'Farándula', url: '/farandula', icon: 'star' },
    { title: 'Tendencias', url: '/tendencias', icon: 'trending-up' },
    { title: 'Registro', url: '/registro', icon: 'person-add' },
    { title: 'Login', url: '/login', icon: 'log-in'}
  ];

  constructor( public firebaseauthService: FirebaseauthService) {}
}
