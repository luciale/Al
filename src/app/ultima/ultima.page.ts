import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
import {IonSlides} from '@ionic/angular';
import {Router} from '@angular/router';
import {FirestoreService} from '../services/firestore.service';
import {Noticia} from '../models';
import {Publicidad} from '../models';
@Component({
  selector: 'app-ultima',
  templateUrl: './ultima.page.html',
  styleUrls: ['./ultima.page.scss'],
})


export class UltimaPage implements OnInit {
  publicidad : Array<Publicidad>;
  baners :  Array<Publicidad>;
  pub: any = {};
  ban: any= {}
  vista= true;
  vista1= true;
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
  this.getPublicidad()
   
  this.getBaners()
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
      
      this.news.sort(function (a, b) {
        if (a.fecha < b.fecha) {
          return 1;
        }
        if (a.fecha > b.fecha) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    
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
  
  getPublicidad(){
    this.publicidad=[];
    let v= 0;
    this.firestore.getCollection1<Publicidad>('Publicidad').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].type== "7"){
        
            // get the input value
            this.publicidad.push(res[i]);
          
        
        
     
        }
      }
      if(this.publicidad.length==0){
        this.vista=false;
      }
      let v = this.getRandomInt(0,this.publicidad.length);
      this.pub= this.publicidad[v];
    })


    
  }
  getBaners(){
    this.baners=[];
    let v= 0;
    this.firestore.getCollection1<Publicidad>('Baner').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].type== "7"){
          this.baners.push(res[i])
        }
      }
      if(this.baners.length==0){
        this.vista1=false;
      }
     
      let v = this.getRandomInt(0,this.publicidad.length);
      this.ban= this.baners[v];
  
    })
    
  }
  
  getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  async close(){
    this.vista= false;
    await this.getBaners();

  }
 
}
