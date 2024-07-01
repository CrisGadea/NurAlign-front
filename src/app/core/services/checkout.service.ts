import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  //private apiUrl = 'http://localhost:8080/api/checkout';
  private apiUrl = 'http://localhost:8081/api/mercadopago';


  constructor(private http: HttpClient) { }

  createCheckout(itemTitle: string, quantity: number, price: number) {
    return this.http.post(this.apiUrl + '/create', { itemTitle, quantity, price }, { responseType: 'text' });
  }

  createPreference(title: string, quantity: number, price: number): Observable<string> {
    return this.http.post(`${this.apiUrl}/createPreference`, null, {
      params: {
        title: title,
        quantity: quantity.toString(),
        price: price.toString()
      },
      responseType: 'text'
    });
  }
}