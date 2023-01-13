import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Última Hora', url: '/ultima', icon: 'time' },
    { title: 'Nacionales', url: '/nacionales', icon: 'newspaper' },
    { title: 'Internacionales', url: '/internacionales', icon: 'globe' },
    { title: 'Deportes', url: '/deportes', icon: 'football' },
    { title: 'Farándula', url: '/farandula', icon: 'star' },
    { title: 'Tendencias', url: '/tendencias', icon: 'trending-up' },
  ];
  public labels = [];
  constructor() {}
}
