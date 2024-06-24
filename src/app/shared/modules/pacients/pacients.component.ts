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
  reportType: string = '';  

  startDate: Date | null = null;
  endDate: Date | null = null;

  moodTracker: any[] = [];
  sleepTracker: any[] = [];
  sessionTherapy: any[] = [];
     



  constructor(private generatorPdfService: GeneratorPdfService,
              private informService: InformService) { }
  ngOnInit(): void {
 
  }


  generar()
  {

    if(this.reportType=="informe")
      {
        this.generarYDescargarPdf();
      }
    if(this.reportType=="grafico")
      {
      }


  }

  validarFecha(algunarray: any[]) {
    if (!this.startDate || !this.endDate) {
      // Si no se han seleccionado fechas, retornar el array sin cambios
      return algunarray;
    }

    // Convertir las fechas seleccionadas a objetos Date
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Filtrar el array por las fechas startDate y endDate
    return algunarray.filter(item => {
      const effectiveDate = new Date(item.effectiveDate); // Convertir effectiveDate a Date

      // Filtrar si effectiveDate está entre start y end (inclusivo)
      return effectiveDate >= start && effectiveDate <= end;
    });
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
         //  this.moodTracker = moodTrackerData ? this.validarFecha(moodTrackerData) : [];
            this.sleepTracker = sleepTrackerData ? this.validarFecha(sleepTrackerData) : [];
            this.sessionTherapy = therapySessionData ? this.validarFecha(therapySessionData) : [];
      
            // Generar el PDF utilizando los datos obtenidos (puede ser vacío si no hay datos)
            this.generatorPdfService.generatePdfFromEntities(this.moodTracker, this.sleepTracker, this.sessionTherapy);
          },
          (error) => {
            console.error("Error obteniendo datos:", error);
            // Aunque ocurra un error, intentamos generar el PDF con los datos actuales (pueden ser vacíos)
            this.generatorPdfService.generatePdfFromEntities(this.moodTracker, this.sleepTracker, this.sessionTherapy);
          }
        );
         }}









