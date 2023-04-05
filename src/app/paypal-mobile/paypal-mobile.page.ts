import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paypal-mobile',
  templateUrl: './paypal-mobile.page.html',
  styleUrls: ['./paypal-mobile.page.scss'],
})
export class PaypalMobilePage implements OnInit {

  constructor() { }
  paymentAmount: string = '3.00';
  currency: string = 'USD';
  currencyIcon: string = '$';

  ngOnInit() {
  }
  /*
  payWithPaypal() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'AbeH6m50UA5QY4zt9DKlJkLGz9PFlCkPvOc89xL3La2XiYcyG8p0zYxGIdK4TGR-thxXElMPd2cyNL3k',
      PayPalEnvironmentSandbox: 'sb-ldwsf23900740@business.example.com'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }*/
}
