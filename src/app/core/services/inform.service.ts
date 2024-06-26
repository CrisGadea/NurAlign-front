import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class InformService{
    apiUrl=environment.apiUrl;

    constructor(private http:HttpClient)  {  }

    getMoodTracker(patientId:any):Observable<any>
    {
    return this.http.get(this.apiUrl + '/moodTracker/patients/'+patientId);
    }


    getSleepTracker(patientId:any):Observable<any>
    {
    return this.http.get(this.apiUrl + '/sleepTracker/patients/'+patientId);
    }



    getTherapySession(patientId:any):Observable<any>
    {
    return this.http.get(this.apiUrl + '/therapySession/patient/'+patientId);
    }


}

