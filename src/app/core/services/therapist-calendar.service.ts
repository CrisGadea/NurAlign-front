import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TherapistCalendarService {
  apiUrl=environment.apiUrl;

  constructor(private http:HttpClient)  {  }

  generateTurn(turn:any):Observable<any>
  {
    let params = JSON.stringify(turn);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + '/TurnTherapist', params, {headers: headers});
   
  }

}
