import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
@Component({
  selector: 'app-paypal-mobile',
  templateUrl: './paypal-mobile.page.html',
  styleUrls: ['./paypal-mobile.page.scss'],
})
export class PaypalMobilePage implements OnInit {

  constructor(private payPal: PayPal) { }

  ngOnInit() {
  }

}
