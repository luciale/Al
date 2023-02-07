import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firestore.service';
import {Noticia} from '../models';
@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.page.html',
  styleUrls: ['./deportes.page.scss'],
})
export class DeportesPage implements OnInit {
  news : Noticia[] = [];
  ingresado= false;
  constructor( private firestore: FirestoreService) { }

  ngOnInit() {
    this.getNoticias()
  }
  getNoticias(){
    this.firestore.getCollection1<Noticia>('Noticias').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].type== "3"){
          this.news.push(res[i])
        }
      }
    })
    
  }
  async Eliminar(){
    console.log("se va a eliminar")
  }
}
