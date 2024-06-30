import { Component } from '@angular/core';
import { CheckoutService } from 'src/app/core/services/checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(private paymentService: CheckoutService) { }

  initiatePayment() {
    this.paymentService.createPreference('Suscripción NurAlign', 1, 9000).subscribe(
      (response: any) => {
        window.location.href = response;
      },
      (error) => {
        console.error('Error creating preference:', error)
      }
      //url => window.location.href = url,
    );
  }
}
