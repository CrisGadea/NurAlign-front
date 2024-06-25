import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartsGeneratorService } from 'src/app/core/services/chartsGenerator.service';

@Component({
  selector: 'app-sleep-chart',
  templateUrl: './sleep-chart.component.html',
  styleUrls: ['./sleep-chart.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class SleepChartComponent implements OnInit {
  sleepTracker: any[] = [];
  fechas: string[] = [];
  horasSueno: number[] = [];

  constructor(private chartsGeneratorService: ChartsGeneratorService) {} 

  ngOnInit() {
    console.log(this.chartsGeneratorService.getSessionTherapyData());

    this.sleepTracker = this.chartsGeneratorService.getSleepTrackerData(); // Obtener sessionTherapyData
    this.fechas = this.sleepTracker.map(item => item.effectiveDate);
    console.log(this.chartsGeneratorService.getSessionTherapyData());
    this.horasSueno = this.sleepTracker.map(item => item.sleepHours);





    const ctx = document.getElementById('myChart3') as HTMLCanvasElement;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.fechas,
        datasets: [{
          label: 'Horas de sueño',
          data: this.horasSueno,
          backgroundColor: 'rgba(54, 162, 235, 1)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
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
