import { Injectable ,ApplicationRef} from '@angular/core';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { InAppPurchase2, IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
const PRODUCT_PRO_KEY= 'userpro'
@Injectable({
    providedIn: 'root'
  })

export class PaymentService {

isPro = false;
products: IAPProduct[] = [];
constructor(private plt: Platform, private store: InAppPurchase2, private ref: ApplicationRef,  private alertController: AlertController,) { 
    this.plt.ready().then(() => {
      this.store.verbosity = this.store.DEBUG;
      this.registerProducts();
      this.setupListeners();

      this.store.ready(() => {
        this.products = this.store.products;
        this.ref.tick();
      })
    });
  }
  registerProducts(){
    this.store.register({
      id: PRODUCT_PRO_KEY,
      type: this.store.PAID_SUBSCRIPTION,
    });
    this.store.refresh();
  }

  setupListeners(){
    this.store.when('product').approved((p: IAPProduct) =>{
      if (p.id === PRODUCT_PRO_KEY ){
        this.isPro= true;
      }
      this.ref.tick();

      return p.verify();
    })
    .verified((p: IAPProduct) => p.finish());
    this.store.when(PRODUCT_PRO_KEY)
    .owned((p: IAPProduct) => {
      this.isPro = true;
    })
  }


  purchase(product: IAPProduct) {
    this.store.order(product).then(() => {
  
    }).catch((e: Error) => {
      this.presentAlert('failed', `ff ${e}`);
    });
  }
  restore(){
    this.store.refresh();
  }
  async presentAlert(header: any,message: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  getProducts(){
    return this.products;
  }
  getPro(){
    return this.isPro;
  }
}
