import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import jsPDF from 'jspdf';
import { ChartsGeneratorService } from 'src/app/core/services/chartsGenerator.service';

@Component({
  selector: 'app-all-charts',
  templateUrl: './all-charts.component.html',
  styleUrls: ['./all-charts.component.css']
})
export class AllChartsComponent implements OnInit {
  horassuenio: boolean = false;
  estadodanimo: boolean = false;
  estadoanimosesion: boolean = false;
  medicacion: boolean = false;
 // startDate: Date | null = null;
//  endDate: Date | null = null;

  constructor(private chartsGeneratorService: ChartsGeneratorService) {} // Asegúrate de inyectar ChartsGeneratorService

  ngOnInit(): void {
    this.horassuenio = this.chartsGeneratorService.getData('horassuenio');
    this.estadodanimo = this.chartsGeneratorService.getData('estadodanimo');
    this.estadoanimosesion = this.chartsGeneratorService.getData('estadoanimosesion');
    this.medicacion = this.chartsGeneratorService.getData('medicacion');
  //  this.startDate = this.chartsGeneratorService.getData('startDate');
   // this.endDate = this.chartsGeneratorService.getData('endDate');

    // Ahora puedes usar estos valores para generar los gráficos
  }
}