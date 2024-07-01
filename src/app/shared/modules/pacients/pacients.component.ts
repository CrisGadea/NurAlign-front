import { Component, OnInit } from '@angular/core';
import { GeneratorPdfService } from 'src/app/core/services/generatorPdf.service';
import { InformService } from 'src/app/core/services/inform.service';
import { forkJoin, lastValueFrom, tap } from 'rxjs';
import { Router } from '@angular/router';
import { GeneratorService } from 'src/app/core/services/generator.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pacients',
  templateUrl: './pacients.component.html',
  styleUrls: ['./pacients.component.css']
})
export class PacientsComponent implements OnInit {

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

  constructor(
    private router: Router,
    private generatorPdfService: GeneratorPdfService,
    private informService: InformService,
    private generatorService: GeneratorService,
    private datePipe: DatePipe 
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.loadPatients();
    this.horassuenio = false;
this.estadodanimo = false;
this.estadoanimosesion = false;
this.medicacion = false;
  }

  loadPatients() {
    if (this.userId) {
      this.informService.getPatientsAllPatients(this.userId).subscribe(
        (data: any) => {
          this.pacientes = data; 
        },
        error => {
          console.error('Error al obtener la lista de pacientes:', error);
        }
      );
    }
  }

  isFormValid(): boolean {
    const checkboxesValid = this.horassuenio || this.estadodanimo || this.estadoanimosesion || this.medicacion;
    return this.selectedPatient && this.startDate && this.endDate && this.reportType && checkboxesValid;
  }

  generar() {
    if (!this.isFormValid()) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    if (this.reportType === "informe") {

      const reportData = {
   
        therapistId:  this.userId , // Ejemplo de cómo usar getData en GeneratorService
        initialDate: this.startDate,
        endDate: this.endDate,
        effectiveDate: new Date().toISOString().slice(0, 10),
        moodFlag: this.estadodanimo,
        sleepFlag: this.horassuenio,
        therapyFlag: this.estadoanimosesion,
        medicationFlag: this.medicacion,
        patientName:  this.selectedPatient.name,
        patientId: this.selectedPatient.id
      };
  
      // Llamada a InformService para guardar el reporte
      this.informService.createReport(reportData).subscribe(
        (response) => {
          console.log('Datos del informe a enviar:', reportData);
          console.log('Datos del informe a enviar:', reportData);
          console.log('Datos del informe a enviar:', reportData);
          console.log('Datos del informe a enviar:', reportData);
          console.log('Reporte guardado exitosamente en el servidor:', response);
        },
        (error) => {
          console.error('Error al guardar el reporte en el servidor:', error);
  
          console.log('Datos del informe a enviar:', reportData);
        }
      );

      this.generarYDescargarPdf();
    } else if (this.reportType === "grafico") {
      this.CargaDatosGrafico();
    }
  }
  CargaDatosGrafico() {
    this.SetearDatos();
    const pacienteId = this.selectedPatient.id;
    const nombre = this.selectedPatient.name;
    const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd')!;
    const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd')!;
  
    const observables = [];
  
    if (this.estadodanimo) {
      observables.push(this.informService.getMoodTrackerByIdAndRange(pacienteId, formattedStartDate, formattedEndDate).pipe(
        tap(data => {
          if (data && data.length > 0) {
            this.generatorService.setMoodTrackerData(data);
          } else {
            this.generatorService.setData('estadodanimo', false);
          }
        })
      ));
    }
  
    if (this.horassuenio) {
      observables.push(this.informService.getSleepTrackerByIdAndRange(pacienteId, formattedStartDate, formattedEndDate).pipe(
        tap(data => {
          if (data && data.length > 0) {
            this.generatorService.setSleepTrackerData(data);
          } else {
            this.generatorService.setData('horassuenio',false);
          }
        })
      ));
    }
  
    if (this.estadoanimosesion) {
      observables.push(this.informService.getTherapySessionByIdAndRange(pacienteId, formattedStartDate, formattedEndDate).pipe(
        tap(data => {
          if (data && data.length > 0) {
            this.generatorService.setSessionTherapyData(data);
          } else {
            this.generatorService.setData('estadoanimosesion', false);
           
          }
        })
      ));
    }
  
    forkJoin(observables).subscribe(
      (results: any[]) => {
        this.router.navigate(['/allcharts']);
      },
      (error) => {
        console.error("Error obteniendo datos:", error);
      }
    );
  }

  generarYDescargarPdf() {
    this.SetearDatos();
    
    this.generatorService.setData('therapistId', this.userId);
    this.generatorService.setData('startDate', this.startDate);
    this.generatorService.setData('endDate', this.endDate);
    const pacienteId = this.selectedPatient.id;
    const nombre = this.selectedPatient.name;
    this.generatorService.setData('nombre', nombre);
   
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

        this.generatorPdfService.generatePdfFromEntities(nombre, this.moodTracker, this.sleepTracker, this.sessionTherapy);
      },
      (error) => {
        console.error("Error obteniendo datos:", error);
        this.generatorPdfService.generatePdfFromEntities(nombre, this.moodTracker, this.sleepTracker, this.sessionTherapy);
      }
    );
  }

  SetearDatos() {
    this.generatorService.setData('horassuenio', this.horassuenio);
    this.generatorService.setData('estadodanimo', this.estadodanimo);
    this.generatorService.setData('estadoanimosesion', this.estadoanimosesion);
    this.generatorService.setData('medicacion', this.medicacion);
  }

  

}
