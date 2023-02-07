import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { clearLine } from 'readline';
import { finalize, Observable } from 'rxjs';
import {Noticia} from '../models';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, public storage: AngularFireStorage ) { }
  
  createDoc(data: any, path: string, id: string){
 
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
    
  }
  getDoc(path:string,id :string){
    const collection= this.firestore.collection(path);
    return collection.doc(id).valueChanges();
  }
  
  deleteDoc(path: string, old_id: string){

    const collection= this.firestore.collection(path);
    return collection.doc(old_id).delete();
  }

  updateDoc(data: any, path:string, id: string){
    const collection= this.firestore.collection(path);
    return collection.doc(id).update(data);
  }
  getId(){
   return  this.firestore.createId();
  }
  getCollection1<Noticia>(path: string){
    const collection = this.firestore.collection<Noticia>(path)
     return collection.valueChanges();

    
  }
  getCollection(){
    this.firestore.collection('Usuario').valueChanges().subscribe((res)=>{
      console.log('res ->', res)
      return res;

    });
  }
  uploadImage(file : any, path: string, nombre: string): Promise <string>{
    return new Promise(resolve =>{
     
      const filePath= path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize( () => {
          ref.getDownloadURL().subscribe( res =>{
            const downloadURL= res;
            resolve(downloadURL);
            return;
          });
        })
      )
      .subscribe();
    });
  }
}