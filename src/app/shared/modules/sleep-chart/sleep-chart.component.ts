import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sleep-chart',
  templateUrl: './sleep-chart.component.html',
  styleUrls: ['./sleep-chart.component.css']
})
export class SleepChartComponent {



  ngOnInit(){

    const ctx = document.getElementById('myChart');
  //"ctx" hace referencia al id del componente canvas
  
    const myChart = new Chart("ctx", {
        type: 'bar',
        data: {
            labels: ['11/6', '12/6', '13/6', '14/6', '15/6', '16/6','17/6', '18/6', '19/6', '20/6', '21/6', '22/6'],
            datasets: [{
                label: 'horas de sueño',
                data: [8, 10, 4, 7, 6, 9,8, 10, 4, 7, 6, 9],
                backgroundColor: [
                  'rgba(54, 162, 235, 1)',

                ],
                borderColor: [
                  'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }
}
