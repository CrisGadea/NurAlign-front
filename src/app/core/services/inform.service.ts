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
    createReport(reportData: any): Observable<any> {
      let params = JSON.stringify(reportData);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(this.apiUrl + '/reports', params, {headers: headers});
    }
 getPatientsAllPatients(therapistId:any):Observable<any>
  {
    return this.http.get(this.apiUrl + '/patients/therapist/'+therapistId);
  }


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


    getMoodTrackerByIdAndRange(patientId: any, fromDate: string, toDate: string): Observable<any> {
      const params = { fromDate, toDate };
      return this.http.get(this.apiUrl + `/moodTracker/patients/range/${patientId}`, { params });
    }
    
    getSleepTrackerByIdAndRange(patientId: any, fromDate: string, toDate: string): Observable<any>
    {
      const params = { fromDate, toDate };
      return this.http.get(this.apiUrl + `/sleepTracker/patients/range/${patientId}`, { params });

    }

    getTherapySessionByIdAndRange(patientId: any, fromDate: string, toDate: string): Observable<any>
    {
      const params = { fromDate, toDate };
      return this.http.get(this.apiUrl + `/therapySession/patients/range/${patientId}`, { params });

    }
    getInformsByTherapistId(therapistId:any){
      return this.http.get(this.apiUrl + '/reports/'+therapistId);
    }


}

