import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { GeneratorService } from 'src/app/core/services/generator.service';

@Component({
  selector: 'app-medication-chart',
  templateUrl: './medication-chart.component.html',
  styleUrls: ['./medication-chart.component.css']
})
export class MedicationChartComponent {



  constructor(private generatorService: GeneratorService) {} 
  ngOnInit() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['11/6', '12/6', '13/6', '14/6', '15/6', '16/6', '17/6', '18/6', '19/6', '20/6', '21/6', '22/6'],
        datasets: [{
          label: 'Medicación tomada',
          data: [1, 0.01, 1, 1, 0.01, 1, 1, 1, 0.01, 1, 1, 0.01], // 1 = Tomada, 0 = No tomada
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 1, // Para que la escala sea de 0 a 1
            ticks: {
              stepSize: 1,
              callback: function(value) { return value ? 'Sí' : 'No'; } // Mostrar "Sí" o "No" en lugar de 1 o 0
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                return context.raw ? 'Sí' : 'No';
              }
            }
          }
        }
      }
    });
  }
}
