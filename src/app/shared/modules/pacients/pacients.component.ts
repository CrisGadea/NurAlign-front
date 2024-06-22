import { Component, OnInit } from '@angular/core';
import { GeneratorPdfService } from 'src/app/core/services/generatorPdf.service';
import { InformService } from 'src/app/core/services/inform.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pacients',
  templateUrl: './pacients.component.html',
  styleUrls: ['./pacients.component.css'],

})
export class PacientsComponent implements OnInit  {
  nombresPacientes: string[] = ['Carlos', 'María', 'Pedro', 'Ana','Eduardo', 'Marío', 'Pepe', 'Jorge'];
  horassuenio = false;
  estadodanimo = false;
  estadoanimosesion = false;
  medicacion = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  moodTracker: any[] = [];
  sleepTracker: any[] = [];
  sessionTherapy: any[] = [];
     



  constructor(private generatorPdfService: GeneratorPdfService,
              private informService: InformService) { }
  ngOnInit(): void {
 
  }


  generarYDescargarPdf() {
    let moodTrackerPromise: Promise<any>;
    let sleepTrackerPromise: Promise<any>;
    let therapySessionPromise: Promise<any>;
    //creo las promesas
    if (this.estadodanimo) {
      moodTrackerPromise = this.informService.getMoodTracker(1).toPromise();
    } else {
      moodTrackerPromise = Promise.resolve(null);
    }

    if(this.horassuenio)
      {sleepTrackerPromise=this.informService.getSleepTracker(6).toPromise();
      }else{
        sleepTrackerPromise=Promise.resolve(null);

      }



      if(this.estadoanimosesion)
        {
          therapySessionPromise=this.informService.getTherapySession(6).toPromise();
        }else
        {
          therapySessionPromise=Promise.resolve(null);
        }





    
        forkJoin([moodTrackerPromise, sleepTrackerPromise, therapySessionPromise]).subscribe(
          ([moodTrackerData, sleepTrackerData, therapySessionData]) => {
            this.moodTracker = moodTrackerData ? moodTrackerData : [];
            this.sleepTracker = sleepTrackerData ? sleepTrackerData : [];
            this.sessionTherapy = therapySessionData ? therapySessionData : [];
      
            // Generar el PDF utilizando los datos obtenidos (puede ser vacío si no hay datos)
            this.generatorPdfService.generatePdfFromEntities(this.moodTracker, this.sleepTracker, this.sessionTherapy);
          },
          (error) => {
            console.error("Error obteniendo datos:", error);
            // Aunque ocurra un error, intentamos generar el PDF con los datos actuales (pueden ser vacíos)
            this.generatorPdfService.generatePdfFromEntities(this.moodTracker, this.sleepTracker, this.sessionTherapy);
          }
        );
       
   /* if(this.horassuenio) 
      { this.informService.getSleepTracker(6).subscribe((data) => {  this.sleepTracker=data; });}
    if(this.estadoanimosesion)
      { this.informService.getTherapySession(6).subscribe((data)=>{this.sessionTherapy=data}); }
*/
  //  this.generatorPdfService.generatePdfFromEntities(this.moodTracker, this.sleepTracker, this.sessionTherapy );
  }}









