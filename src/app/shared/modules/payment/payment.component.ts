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
    this.paymentService.createPreference('Suscripción NurAlign', 1, 1).subscribe(
      (response: any) => {
        window.location.href = response.init_point;
      },
      (error) => {
        console.error('Error creating preference:', error)
      }
      //url => window.location.href = url,


      // (response: any) => {
      //   console.log("Response from backend:", response); // Añade esta línea
      //   if (response) {
      //     window.location.href = response.init_point;
      //   } else {
      //     console.error("init_point is undefined");
      //     alert("Error generating payment link. Please try again.");
      //   }
      // }, (error) => {
      //   console.error("Error:", error);
      //   alert("Error generating payment link. Please try again.");
      // }
    );
  }
}
