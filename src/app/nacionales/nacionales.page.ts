import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FirestoreService} from '../services/firestore.service';
import {Noticia} from '../models';
@Component({
  selector: 'app-nacionales',
  templateUrl: './nacionales.page.html',
  styleUrls: ['./nacionales.page.scss'],
})
export class NacionalesPage implements OnInit {
  news : Noticia[] = [];
  news_t: any = [];
  id: any;
  new_u: any ={};
  type_title : any;
  ingresado= false;
  constructor(private http: HttpClient,
    private router: Router ,
    private firestore: FirestoreService) { }

  ngOnInit() {
   this.getNoticias()
    
 
   
  }

  getNoticias(){
    this.firestore.getCollection1<Noticia>('Noticias').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].type== "1"){
          this.news.push(res[i])
        }
      }
    })
    
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