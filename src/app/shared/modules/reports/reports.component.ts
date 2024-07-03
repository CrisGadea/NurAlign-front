import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, forkJoin } from 'rxjs';
import { InformService } from 'src/app/core/services/inform.service';
import { GeneratorPdfService } from 'src/app/core/services/generatorPdf.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  informes: any[] = [];
  selectedReport: any = null; // Solo un objeto, no necesitas un arreglo para un solo informe
  estadodanimo: any; // Asegúrate de definir esto según sea necesario en tu contexto

  constructor(
    private informService: InformService,
    private generatorPdfService: GeneratorPdfService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const therapistId = localStorage.getItem('userId');
  
    if (therapistId) {
      this.informService.getInformsByTherapistId(therapistId).subscribe(
        (data: any) => {
          this.informes = data;
          console.log(this.informes);
        },
        error => {
          console.error('Error al obtener los informes:', error);
        }
      );
    } else {
      console.error('Therapist ID no encontrado en localStorage');
    }
  }
  


  selectReport(informe: any) {
    this.selectedReport = informe;

    const pacienteId = informe.patientId;
    const nombre = informe.patientName;
    const formattedStartDate = informe.initialDate;
    const formattedEndDate = informe.endDate;
    const observables = [];

    if (informe.moodFlag) {
      observables.push(
        this.informService.getMoodTrackerByIdAndRange(pacienteId, formattedStartDate, formattedEndDate)
      );
    }

    if (informe.sleepFlag) {
      observables.push(
        this.informService.getSleepTrackerByIdAndRange(pacienteId, formattedStartDate, formattedEndDate)
      );
    }

    if (informe.therapyFlag) {
      observables.push(
        this.informService.getTherapySessionByIdAndRange(pacienteId, formattedStartDate, formattedEndDate)
      );
    }

    forkJoin(observables).subscribe(
      ([moodTrackerData, sleepTrackerData, therapySessionData]) => {
        const moodTracker = moodTrackerData || [];
        const sleepTracker = sleepTrackerData || [];
        const sessionTherapy = therapySessionData || [];

        this.generatorPdfService.generatePdfFromEntities(nombre, moodTracker, sleepTracker, sessionTherapy);
      },
      (error) => {
        console.error("Error obteniendo datos:", error);
        // Manejo de errores si es necesario
      }
    );
  }
}
