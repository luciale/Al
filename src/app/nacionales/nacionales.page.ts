import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
@Component({
  selector: 'app-nacionales',
  templateUrl: './nacionales.page.html',
  styleUrls: ['./nacionales.page.scss'],
})
export class NacionalesPage implements OnInit {
  news : any = [];
  news_t: any = [];
  id: any;
  new_u: any ={};
  type_title : any;
  ingresado= false;
  constructor(private http: HttpClient,
    private router: Router ) { }

  ngOnInit() {
    console.log(this.ingresado)
    this.ingresado= JSON.parse(localStorage.getItem('ingresado') as string);
    console.log(this.ingresado)
    if(this.ingresado== null){
      this.ingresado= false;
    }
    console.log(this.ingresado)
    this.getNews().subscribe(res=>{
    
      for(let i =0; i< res.length; i++){
        if(res[i].type==1){
       
          this.news.push(res[i]);
        }
      }
      
   
    })
    console.log(this.news);
  }

  getNews(){
    return this.http
      .get("assets/models/new_t.json")
      .pipe(
        map((res:any) => {
          return res.data;
        })
      )
    }
    async Eliminar(){
      console.log("se va a eliminar")
    }
}