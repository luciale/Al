import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InAppPurchase2, IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { PaymentService } from '../services/payment.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  isPro = false;
  products: IAPProduct[] = [];
  constructor(private payments: PaymentService) { 

  }

 async ngOnInit() {
    this.products= await this.payments.getProducts();
    this.isPro = await this.payments.getPro();
  }

async purchase(product: IAPProduct){
  await this.payments.purchase(product);
}
}
