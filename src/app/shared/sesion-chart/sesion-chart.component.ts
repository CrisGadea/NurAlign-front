import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';
import { GeneratorService } from 'src/app/core/services/generator.service';

@Component({
  selector: 'app-sesion-chart',
  templateUrl: './sesion-chart.component.html',
  styleUrls: ['./sesion-chart.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class SesionChartComponent implements OnInit {
  sessionTherapy: any[] = [];
  fechas: string[] = [];
  animoSesion: number[] = [];

  constructor(private generatorService: GeneratorService) {}

  ngOnInit() {
    this.sessionTherapy = this.generatorService.getSessionTherapyData();
    this.fechas = this.sessionTherapy.map(item => item.effectiveDate);
    this.animoSesion = this.sessionTherapy.map(item => parseInt(item.sessionFeel, 10));

    const ctx = document.getElementById('myChart2') as HTMLCanvasElement;

    const data = {
      labels: this.fechas,
      datasets: [
        {
          label: 'Estado de ánimo Post Sesión',
          data: this.animoSesion,
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Sombreado bajo la línea
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: true, // Habilitar sombreado
          tension: 0.4 // Curvatura de la línea
        }
      ]
    };

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0, // Asegurar que no haya decimales en el eje y
            callback: function(value) {
              switch (value) {
                case 1:
                  return 'Muy mal';
                case 2:
                  return 'Mal';
                case 3:
                  return 'Regular';
                case 4:
                  return 'Bien';
                case 5:
                  return 'Muy bien';
                default:
                  return ''; // Devuelve una cadena vacía para cualquier valor que no esté mapeado
              }
            }
          }
        }
      }
    };

    new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
  }
}
