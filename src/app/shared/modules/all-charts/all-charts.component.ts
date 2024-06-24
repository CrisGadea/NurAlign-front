import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-all-charts',
  templateUrl: './all-charts.component.html',
  styleUrls: ['./all-charts.component.css']
})
export class AllChartsComponent {


  nombresPacientes: string[] = ['Carlos', 'María', 'Pedro', 'Ana','Eduardo', 'Marío', 'Pepe', 'Jorge'];
 
  horassuenio = false;
  estadodanimo = false;
  estadoanimosesion = false;
  medicacion = false;

  generatePDF() {
    const doc = new jsPDF();

    const promises: Promise<void>[] = [];
    console.log("probando");

    
    if (this.horassuenio) {
      promises.push(this.addSleepChartToPDF(doc));
    }
    if (this.estadodanimo) {
      promises.push(this.addMoodChartToPDF(doc));
    }
    if (this.estadoanimosesion) {
      promises.push(this.addOtherChartToPDF(doc)); // Función para otro gráfico
    }

    Promise.all(promises).then(() => {
      doc.save('charts.pdf');
    });
  }

  addMoodChartToPDF(doc: jsPDF): Promise<void> {
    return new Promise((resolve) => {
      const canvas = this.createMoodChartCanvas();
      setTimeout(() => {
        const imageData = canvas.toDataURL('image/png');
        doc.addImage(imageData, 'PNG', 10, 10, 190, 90);
        resolve();
      }, 500); // Esperar a que se renderice el gráfico
    });
  }

  addSleepChartToPDF(doc: jsPDF): Promise<void> {
    return new Promise((resolve) => {
      const canvas = this.createSleepChartCanvas();
      setTimeout(() => {
        const imageData = canvas.toDataURL('image/png');
        doc.addImage(imageData, 'PNG', 10, 10, 190, 90);
        resolve();
      }, 500); // Esperar a que se renderice el gráfico
    });
  }

  addOtherChartToPDF(doc: jsPDF): Promise<void> {
    return new Promise((resolve) => {
      const canvas = this.createOtherChartCanvas();
      setTimeout(() => {
        const imageData = canvas.toDataURL('image/png');
        doc.addImage(imageData, 'PNG', 10, 10, 190, 90);
        resolve();
      }, 500); // Esperar a que se renderice el gráfico
    });
  }

  createMoodChartCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const data = {
      labels: ['13/6', '14/6', '15/6', '16/6', '17/6', '18/6', '19/6'],
      datasets: [
        { label: 'Animo Elevado', data: [0.1, 5, 3, 1, null, 4, 1], backgroundColor: 'rgba(108, 245, 109, 0.3)', borderColor: 'rgba(108, 245, 109, 1)', fill: true },
        { label: 'Animo Irritable', data: [2, 2, 4, 5, 1, 4, 3], backgroundColor: 'rgba(245, 174, 108, 0.3)', borderColor: 'rgba(245, 174, 108, 1)', fill: true },
        { label: 'Animo Ancioso', data: [5, 4, 3, 2, 4, 1, 5], backgroundColor: 'rgba(252, 126, 158,0.3)', borderColor: 'rgba(252, 126, 158, 1)', fill: true },
        { label: 'Animo deprimido', data: [5, 1, 5, 1, 1, 3, 2], backgroundColor: 'rgba(126, 145, 252, 0.3)', borderColor: 'rgba(126, 145, 252, 1)', fill: true }
      ]
    };

    new Chart(ctx, { type: 'bar', data: data });

    return canvas;
  }

  createSleepChartCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const data = {
      labels: ['11/6', '12/6', '13/6', '14/6', '15/6', '16/6', '17/6', '18/6', '19/6', '20/6', '21/6', '22/6'],
      datasets: [{ label: 'horas de sueño', data: [8, 10, 4, 7, 6, 9, 8, 10, 4, 7, 6, 9], backgroundColor: 'rgba(54, 162, 235, 1)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 }]
    };

    new Chart(ctx, { type: 'bar', data: data });

    return canvas;
  }

  createOtherChartCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const data = {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [{ label: 'Ejemplo', data: [1, 2, 3, 4, 5], backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1 }]
    };

    new Chart(ctx, { type: 'line', data: data });

    return canvas;
  }
}