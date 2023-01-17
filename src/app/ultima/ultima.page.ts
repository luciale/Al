import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
import {IonSlides} from '@ionic/angular';
import {Router} from '@angular/router';
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
    autoplay: true}

  news : any = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.http)
    
    this.getNews().subscribe(res=>{
      console.log("Res",res)
      this.news = res;
    });
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

  goToRoute(val: any){
    console.log(val)
   
  }
}
