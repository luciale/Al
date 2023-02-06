import { Component, OnInit } from '@angular/core';

import { ImagePicker, ImagePickerOptions } from '@awesome-cordova-plugins/image-picker/ngx';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {map} from 'rxjs/operators'
const IMAGE_DIR = 'stored-images';

interface LocalFile {
	name: string;
	path: string;
	data: string;
}
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  formularioRegistro: FormGroup;
  images: LocalFile[] = [];
  news : any = [];

  url: any;
  securepath: any = window;
  private file:any= File;
  constructor(
    public fb: FormBuilder,
    private plt: Platform,
		private http: HttpClient,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
     private imagepicker: ImagePicker, public actionSheetController: ActionSheetController) {
      this.formularioRegistro = this.fb.group({
        'title': new FormControl("", Validators.required),
        'descripcion': new FormControl("", Validators.required),
        'detalles': new FormControl("", Validators.required),
        'imagen': new FormControl("", Validators.required),
      });
      }

  ngOnInit() {
    this.loadFiles();
	this.getNews().subscribe(res=>{
		this.news = res;
		
	 
	  })
  }

  onFileChange(fileChangeEvent:any) {
    this.file = fileChangeEvent.target.files[0];
  }
  async submitForm() {
    let formData = new FormData();
	var f = this.formularioRegistro.value;
	formData.append("photo", this.file, this.file.name);

    var noticia = {
      id: 6,
	  title: f.title,
	  description :f.descripcion,
	  details: f.detalles,
	  image: "reina.jpg",
	  type: 1,
	  state: 1,
	  createdAt: "01022023",
	  changedAt: "02022023"
    }
	//var j= JSON.stringify(noticia)

	
	// var n= JSON.stringify(noticia)
//	this.news.add(j)
	console.log(this.news)
	console.log(noticia)
	this.news.push(noticia)
	console.log(this.news)
	var n= JSON.stringify(this.news)
	console.log(n)
	//this.news.push(noticia)
	//console.log(this.news)
    //localStorage.setItem('usuario',JSON.stringify(usuario));
	this.http.post("assets/models/new_t.json", this.news).subscribe((response) => {
		console.log(response);
	  });
   /* this.http.post("http://localhost:3000/upload", formData).subscribe((response) => {
      console.log(response);
    });*/
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
  async loadFiles() {
		this.images = [];

		const loading = await this.loadingCtrl.create({
			message: 'Loading data...'
		});
		await loading.present();

		Filesystem.readdir({
			path: IMAGE_DIR,
			directory: Directory.Data
		})
			.then(
				(result) => {
					this.loadFileData(result.files);
				},
				async (err) => {
					// Folder does not yet exists!
					await Filesystem.mkdir({
						path: IMAGE_DIR,
						directory: Directory.Data
					});
				}
			)
			.then((_) => {
				loading.dismiss();
			});
	}

  async loadFileData(fileNames: any[]) {
		for (let f of fileNames) {
			const filePath = `${IMAGE_DIR}/${f}`;

			const readFile = await Filesystem.readFile({
				path: filePath,
				directory: Directory.Data
			});

			this.images.push({
				name: f,
				path: filePath,
				data: `data:image/jpeg;base64,${readFile.data}`
			});
		}
	}
}
