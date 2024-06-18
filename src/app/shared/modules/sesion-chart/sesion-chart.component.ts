import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-sesion-chart',
  templateUrl: './sesion-chart.component.html',
  styleUrls: ['./sesion-chart.component.css']
})
export class SesionChartComponent {


  ngOnInit() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['11/6', '12/6', '13/6', '14/6', '15/6', '16/6','17/6', '18/6', '19/6', '20/6', '21/6', '22/6'],
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
