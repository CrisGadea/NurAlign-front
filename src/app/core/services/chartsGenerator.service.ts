
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartsGeneratorService {
    private data: any = {};
    private sessionTherapyData: any[] = [];
    private sleepTrackerData: any[] = [];

    setData(key: string, value: any) {
      this.data[key] = value;
    }
  
    getData(key: string) {
      return this.data[key];
    }

    setSleepTrackerData(data: any[]) 
    {
      this.sleepTrackerData = data;

    }


    getSleepTrackerData(): any[]
     {
      return this.sleepTrackerData;

     }
    setSessionTherapyData(data: any[]) {
     
      this.sessionTherapyData = data;
      
    }
  
    getSessionTherapyData(): any[] {
      return this.sessionTherapyData;
    }

  }