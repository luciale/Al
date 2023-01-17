import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
@Component({
  selector: 'app-ultima',
  templateUrl: './ultima.page.html',
  styleUrls: ['./ultima.page.scss'],
})
export class UltimaPage implements OnInit {

  news : any = [];

  constructor(
    private http: HttpClient
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
}
