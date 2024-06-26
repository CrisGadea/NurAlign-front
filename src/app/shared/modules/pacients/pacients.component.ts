import { Component, OnInit } from '@angular/core';
import { GeneratorPdfService } from 'src/app/core/services/generatorPdf.service';
import { InformService } from 'src/app/core/services/inform.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ChartsGeneratorService } from 'src/app/core/services/chartsGenerator.service';
import { map, tap } from 'rxjs/operators';


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
     



  constructor(  private router: Router,
    private generatorPdfService: GeneratorPdfService,
              private informService: InformService,
              private chartsGeneratorService: ChartsGeneratorService ) { }
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

        this.CargaDatosGrafico();
   

      

      //this.router.navigate(['/allcharts']);
    
      }


  }
  CargaDatosGrafico() {
    // Configurar todos los datos en el servicio ChartsGeneratorService
    this.chartsGeneratorService.setData('horassuenio', this.horassuenio);
    this.chartsGeneratorService.setData('estadodanimo', this.estadodanimo);
    this.chartsGeneratorService.setData('estadoanimosesion', this.estadoanimosesion);
    this.chartsGeneratorService.setData('medicacion', this.medicacion);
  
    // Crear un array de observables para combinar
    const observables = [];
   
    // Ejemplo: Obtener datos de sleepTracker
    if (this.estadodanimo) {
      observables.push(this.informService.getMoodTracker(6).pipe(
        map(data => this.validarFecha(data)),
        tap(filteredData => this.chartsGeneratorService.setMoodTrackerData(filteredData))
      ));
    }


    if (this.horassuenio) {
      observables.push(this.informService.getSleepTracker(6).pipe(
        map(data => this.validarFecha(data)),
        tap(filteredData => this.chartsGeneratorService.setSleepTrackerData(filteredData))
      ));
    }

    // Ejemplo: Obtener datos de therapySession
    if (this.estadoanimosesion) {
      observables.push(this.informService.getTherapySession(6).pipe(
        map(data => this.validarFecha(data)),
        tap(filteredData => this.chartsGeneratorService.setSessionTherapyData(filteredData))
      ));
    }
  
    // Ejemplo: Obtener datos de moodTracker (si es necesario)
    // Puedes agregar más lógica según los datos que necesites obtener
  
    // Combinar todos los observables usando forkJoin
    forkJoin(observables).subscribe(
      (results: any[]) => {
        // Una vez que todos los datos están listos, navegar a la página /allcharts
        this.router.navigate(['/allcharts']);
      },
      (error) => {
        console.error("Error obteniendo datos:", error);
        // Manejar errores si es necesario
      }
    );
  }

  validarFecha(algunarray: any[]) {
    if (!this.startDate || !this.endDate) {
      // Si no se han seleccionado fechas, ordenar el array sin filtrar por fechas
      return algunarray.sort((a, b) => new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime());
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    return algunarray
      .filter((item) => {
        const effectiveDate = new Date(item.effectiveDate);
        return effectiveDate >= start && effectiveDate <= end;
      })
      .sort((a, b) => new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime());
  }

  generarYDescargarPdf() {
    let moodTrackerPromise: Promise<any>;
    let sleepTrackerPromise: Promise<any>;
    let therapySessionPromise: Promise<any>;

   
    //creo las promesas
    if (this.estadodanimo) {
      moodTrackerPromise = this.informService.getMoodTracker(6).toPromise();
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
            console.log(moodTrackerData);  console.log(moodTrackerData);  console.log(moodTrackerData);  console.log(moodTrackerData);  console.log(moodTrackerData);
           this.moodTracker = moodTrackerData ? this.validarFecha(moodTrackerData) : [];   
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









