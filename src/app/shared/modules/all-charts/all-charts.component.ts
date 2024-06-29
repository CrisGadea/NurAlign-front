import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import jsPDF from 'jspdf';
import { GeneratorService } from 'src/app/core/services/generator.service';

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

  constructor(private generatorService: GeneratorService) {} // Asegúrate de inyectar ChartsGeneratorService

  ngOnInit(): void {
    this.horassuenio = this.generatorService.getData('horassuenio');
    this.estadodanimo = this.generatorService.getData('estadodanimo');
    this.estadoanimosesion = this.generatorService.getData('estadoanimosesion');
    this.medicacion = this.generatorService.getData('medicacion');
  //  this.startDate = this.chartsGeneratorService.getData('startDate');
   // this.endDate = this.chartsGeneratorService.getData('endDate');

    // Ahora puedes usar estos valores para generar los gráficos
  }
}