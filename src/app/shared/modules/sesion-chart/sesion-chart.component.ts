import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ChartsGeneratorService } from 'src/app/core/services/chartsGenerator.service';

@Component({
  selector: 'app-sesion-chart',
  templateUrl: './sesion-chart.component.html',
  styleUrls: ['./sesion-chart.component.css'],  imports:[CommonModule],
  standalone:true
})
export class SesionChartComponent implements OnInit {
  sessionTherapy: any[] = [];
  fechas: string[] = [];
constructor(private chartsGeneratorService: ChartsGeneratorService) {} 
  
  ngOnInit() {

    
    console.log(this.chartsGeneratorService.getSessionTherapyData());

    this.sessionTherapy = this.chartsGeneratorService.getSessionTherapyData(); // Obtener sessionTherapyData
    this.fechas = this.sessionTherapy.map(item => item.effectiveDate);
    console.log(this.chartsGeneratorService.getSessionTherapyData());

    const ctx = document.getElementById('myChart2') as HTMLCanvasElement;

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.fechas,
        datasets: [{
          label: 'Estado de animo Post Session',
          data: [5, 2, 4, 5, 0, 2, 3, 5, 4, 5, 4, 5],
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Sombreado bajo la línea
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: true, // Habilitar sombreado
          tension: 0.4 // Curvatura de la línea
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

}
