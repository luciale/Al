import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firestore.service';
import {Noticia} from '../models';
@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.page.html',
  styleUrls: ['./tendencias.page.scss'],
})
export class TendenciasPage implements OnInit {
  news : Noticia[] = [];
  ingresado= false;
  constructor( private firestore: FirestoreService) { }

  ngOnInit() {
    this.getNoticias()
  }
  getNoticias(){
    this.firestore.getCollection1<Noticia>('Noticias').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].type== "5"){
          this.news.push(res[i])
        }
      }
    })
    
  }
  async Eliminar(){
    console.log("se va a eliminar")
  }

}
