import { Component, OnInit } from '@angular/core';
import { GeneratorPdfService } from 'src/app/core/services/generatorPdf.service';
import { InformService } from 'src/app/core/services/inform.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ChartsGeneratorService } from 'src/app/core/services/chartsGenerator.service';
import { map, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


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
  selectedPatient: any;
  

  startDate: Date | null = null;
  endDate: Date | null = null;

  pacientes: any[] = [];

  moodTracker: any[] = [];
  sleepTracker: any[] = [];
  sessionTherapy: any[] = [];
  userId!: string | null;
     



  constructor(  private router: Router,
    private generatorPdfService: GeneratorPdfService,
              private informService: InformService,
              private chartsGeneratorService: ChartsGeneratorService,
              private datePipe: DatePipe ) { }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
 console.log(this.userId);
 this.loadPatients();
 
  }
  loadPatients() {
    if (this.userId) {
      this.informService.getPatientsAllPatients(this.userId).subscribe(
        (data: any) => {
          this.pacientes = data; // Guardar la lista de pacientes en la variable pacientes
          
          console.log('Lista de pacientes:', this.pacientes);
        },
        error => {
          console.error('Error al obtener la lista de pacientes:', error);
        }
      );
    }}

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
    const pacienteId = this.selectedPatient.id;
  
    const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd')!;
    const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd')!;
  
    // Crear un array de observables para combinar
    const observables = [];
  
    // Obtener datos de moodTracker
    if (this.estadodanimo) {
      observables.push(this.informService.getMoodTrackerByIdAndRange(pacienteId, formattedStartDate, formattedEndDate).pipe(
        tap(data => this.chartsGeneratorService.setMoodTrackerData(data))
      ));
    }
  
    // Obtener datos de sleepTracker
    if (this.horassuenio) {
      observables.push(this.informService.getSleepTrackerByIdAndRange(pacienteId, formattedStartDate, formattedEndDate).pipe(
        tap(data => this.chartsGeneratorService.setSleepTrackerData(data))
      ));
    }
  
    // Obtener datos de therapySession
    if (this.estadoanimosesion) {
      observables.push(this.informService.getTherapySessionByIdAndRange(pacienteId, formattedStartDate, formattedEndDate).pipe(
        tap(data => this.chartsGeneratorService.setSessionTherapyData(data))
      ));
    }
  
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
    const pacienteId = this.selectedPatient.id;
  
    const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd')!;
    const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd')!;
  
    const moodTrackerPromise = this.estadodanimo
      ? lastValueFrom(this.informService.getMoodTrackerByIdAndRange(pacienteId, formattedStartDate, formattedEndDate))
      : Promise.resolve(null);
  
    const sleepTrackerPromise = this.horassuenio
      ? lastValueFrom(this.informService.getSleepTrackerByIdAndRange(pacienteId, formattedStartDate, formattedEndDate))
      : Promise.resolve(null);
  
    const therapySessionPromise = this.estadoanimosesion
      ? lastValueFrom(this.informService.getTherapySessionByIdAndRange(pacienteId, formattedStartDate, formattedEndDate))
      : Promise.resolve(null);
  
    forkJoin([moodTrackerPromise, sleepTrackerPromise, therapySessionPromise]).subscribe(
      ([moodTrackerData, sleepTrackerData, therapySessionData]) => {
        this.moodTracker = moodTrackerData || [];
        this.sleepTracker = sleepTrackerData || [];
        this.sessionTherapy = therapySessionData || [];
  
        // Generar el PDF utilizando los datos obtenidos (puede ser vacío si no hay datos)
        this.generatorPdfService.generatePdfFromEntities(this.moodTracker, this.sleepTracker, this.sessionTherapy);
      },
      (error) => {
        console.error("Error obteniendo datos:", error);
        // Aunque ocurra un error, intentamos generar el PDF con los datos actuales (pueden ser vacíos)
        this.generatorPdfService.generatePdfFromEntities(this.moodTracker, this.sleepTracker, this.sessionTherapy);
      }
    );
  }






}


