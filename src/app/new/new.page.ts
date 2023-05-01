import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
import {IonSlides} from '@ionic/angular';
import {Router} from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import {FirestoreService} from '../services/firestore.service';
import {Noticia} from '../models';
@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  news : Noticia[] = [];
  id: any;
  new_u: any;
  type_title : any;
  list_im : any[] = [];
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    autoplayDisableOnInteraction: false
  }

  constructor(private http: HttpClient,
    private router: Router ,private route: ActivatedRoute,
    private firestore: FirestoreService) { }

  ngOnInit() {
    this.id= this.route.snapshot.paramMap.get("id")
    this.getNoticia(this.id)
  }

 async getNoticia(id: any){
    this.new_u = this.firestore.getDoc('Noticias',id);
   await this.firestore.getCollection1<Noticia>('Noticias').subscribe( res => {
      for(let i= 0; i< res.length; i++){
        if(res[i].id==id){
          var data = {
            imagen_url : res[i].image,
            imagen_txt: res[i].au_im
          }
          this.new_u=(res[i])
          this.list_im.push(data)
          if(res[i].image1===null){

          }else{
         
            var data = {
              imagen_url : res[i].image1,
              imagen_txt:  res[i].au_im1
            }
            this.list_im.push(data)
            if(res[i].image2===null){
          
            }else{
              var data = {
                imagen_url : res[i].image2,
                imagen_txt: res[i].au_im2
              }
              this.list_im.push(data)
              if(res[i].image2===null){}
              else{
                var data = {
                  imagen_url : res[i].image3,
                  imagen_txt:  res[i].au_im3
                }
                this.list_im.push(data)
              }
            }
           
          }
         
         
          this.type_title = this.getType(this.new_u.type);
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

    getType(type: any){
      if(type==1){
        return "Nacionales"
      }if(type==2){
        return "Internacionales"
      }if(type==3){
        return "Deportes"
      }if(type==4){
        return "Farándula y Espectáculo"
      }if(type==5){
        return "Tendencias"
      }
      return null
    }
}
