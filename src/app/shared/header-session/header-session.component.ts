import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from 'src/app/core/services/login.service';
import { CheckoutService } from 'src/app/core/services/checkout.service';

@Component({
  selector: 'app-header-session',
  templateUrl: './header-session.component.html',
  styleUrls: ['./header-session.component.css'],
  imports:[CommonModule],
  standalone:true
})
export class HeaderSessionComponent {

  constructor(private loginService: LoginService,
    private paymentService: CheckoutService
  ) { }

  logout(){
    this.loginService.logout();
  }

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
