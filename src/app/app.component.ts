import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  ingresado= JSON.parse(localStorage.getItem('ingresado') as string);
  
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
  public labels = [];
  constructor() {}
}
