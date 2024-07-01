import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { GeneratorService } from 'src/app/core/services/generator.service';

@Component({
  selector: 'app-sesion-chart',
  templateUrl: './sesion-chart.component.html',
  styleUrls: ['./sesion-chart.component.css'],  imports:[CommonModule],
  standalone:true
})
export class SesionChartComponent implements OnInit {
  sessionTherapy: any[] = [];
  fechas: string[] = [];
  animoSesion:number[]=[];

  

constructor(private generatorService: GeneratorService) {} 
  
  ngOnInit() {

    this.sessionTherapy = this.generatorService.getSessionTherapyData(); // Obtener sessionTherapyData
    this.fechas = this.sessionTherapy.map(item => item.effectiveDate);
    this.animoSesion=this.sessionTherapy.map(item=>parseInt(item.sessionFeel,10));

    const ctx = document.getElementById('myChart2') as HTMLCanvasElement;

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.fechas,
        datasets: [{
          label: 'Estado de animo Post Sesión',
          data: this.animoSesion,
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
