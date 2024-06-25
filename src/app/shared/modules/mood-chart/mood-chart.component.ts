import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';
import { ChartsGeneratorService } from 'src/app/core/services/chartsGenerator.service';

@Component({
  selector: 'app-mood-chart',
  templateUrl: './mood-chart.component.html',
  styleUrls: ['./mood-chart.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class MoodChartComponent implements OnInit {

  

  constructor(private chartsGeneratorService: ChartsGeneratorService) {} 
  ngOnInit() {




    
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const data = {
      labels: ['13/6', '14/6', '15/6', '16/6', '17/6', '18/6', '19/6'],
      datasets: [
        {
          label: 'Animo Elevado',
          data: [2, 5, 3, 1, 4, 4, 1],
          backgroundColor: 'rgba(108, 245, 109, 1)',
          borderColor: 'rgba(108, 245, 109, 1)',
          fill: true,
        },
        {
          label: 'Animo Irritable',
          data: [2, 2, 4, 5, 1, 4, 3],
          backgroundColor: 'rgba(245, 174, 108, 1)',
          borderColor: 'rgba(245, 174, 108, 1)',
          fill: true,
        },
        {
          label: 'Animo Ancioso',
          data: [5, 4, 3, 2, 4, 1, 5],
          backgroundColor: 'rgba(252, 126, 158,1)',
          borderColor: 'rgba(252, 126, 158, 1)',
          fill: true,
        },
        {
          label: 'Animo deprimido',
          data: [5, 1, 5, 1, 1, 3, 2],
          backgroundColor: 'rgba(126, 145, 252, 1)', /* Light Sky Blue */
          borderColor: 'rgba(126, 145, 252, 1)',
          fill: true,
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
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          enabled: true,
        }
      }
    };

    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
  }
}
