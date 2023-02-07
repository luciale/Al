import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
import {IonSlides} from '@ionic/angular';
import {Router} from '@angular/router';
import {FirestoreService} from '../services/firestore.service';
import {Noticia} from '../models';
@Component({
  selector: 'app-ultima',
  templateUrl: './ultima.page.html',
  styleUrls: ['./ultima.page.scss'],
})


export class UltimaPage implements OnInit {

  slider: any;
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    autoplayDisableOnInteraction: false
  }

  news : Noticia[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private firestore: FirestoreService
  ) { }

  ngOnInit() {
  
  this.getNoticias();
  }

  getNews(){
      return this.http
        .get("assets/models/new.json")
        .pipe(
          map((res:any) => {
            return res.data;
          })
        )
  }

  getNoticias(){
    this.firestore.getCollection1<Noticia>('Ultima').subscribe( res => {
      this.news= res;
    })
    
  }
  goToRoute(val: any){
    console.log(val)
    if(val.type==1){
      this.router.navigate(['/nacionales'])
      
    }
    if(val.type==2){
      this.router.navigate(['/internacionales'])
    }
    if(val.type==3){
      this.router.navigate(['/deportes'])
    }
    if(val.type==4){
      this.router.navigate(['/farandula'])
    }
    if(val.type==5){
      this.router.navigate(['/tendencias'])
    }
 
  }
 
}
