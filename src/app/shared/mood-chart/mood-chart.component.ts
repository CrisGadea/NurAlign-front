import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';
import { GeneratorService} from 'src/app/core/services/generator.service';

@Component({
  selector: 'app-mood-chart',
  templateUrl: './mood-chart.component.html',
  styleUrls: ['./mood-chart.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class MoodChartComponent implements OnInit {
  moodTracker: any[] = [];
  fechas: string[] = [];

  animoElevado:number[]=[];
  animoDeprimido:number[]=[];
  animoAnsioso:number[]=[];
  animoIrritable:number[]=[];
  

  constructor(private generatorService: GeneratorService) {} 
  ngOnInit() {

this.moodTracker=this.generatorService.getMoodTrackerData();
this.fechas=this.moodTracker.map(item => item.effectiveDate);
this.animoElevado=this.moodTracker.map(item=>item.highestValue);
this.animoDeprimido=this.moodTracker.map(item=>item.lowestValue);
this.animoAnsioso=this.moodTracker.map(item=>item.anxiousValue);
this.animoIrritable=this.moodTracker.map(item=>item.irritableValue);

    
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const data = {
      labels: this.fechas,
      datasets: [
        {
          label: 'Animo Elevado',
          data: this.animoElevado,
          backgroundColor: 'rgba(108, 245, 109, 1)',
          borderColor: 'rgba(108, 245, 109, 1)',
          fill: true,
        },
        {
          label: 'Animo Irritable',
          data: this.animoDeprimido,
          backgroundColor: 'rgba(245, 174, 108, 1)',
          borderColor: 'rgba(245, 174, 108, 1)',
          fill: true,
        },
        {
          label: 'Animo Ancioso',
          data: this.animoAnsioso,
          backgroundColor: 'rgba(252, 126, 158,1)',
          borderColor: 'rgba(252, 126, 158, 1)',
          fill: true,
        },
        {
          label: 'Animo deprimido',
          data: this.animoIrritable,
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
