import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class GeneratorPdfService {

  constructor() { }

  generatePdfFromEntities(moodTracker: any[],sleepTracker: any[],sessionTherapy: any[]) {
      const pdf = new jsPDF();
    const pageHeight = pdf.internal.pageSize.height;
    const marginTop = 20; // Margen superior
    const marginBottom = 20; // Margen inferior
    let yPos = marginTop;

    // Function to check and add new page if needed
    const checkPageHeight = (additionalHeight = 10) => {
      if (yPos + additionalHeight > pageHeight - marginBottom) {
        pdf.addPage();
        yPos = marginTop;
      }
    };

    // Configurar colores y estilos
    pdf.setTextColor(0, 0, 0); // Texto en color negro
    pdf.setFillColor(255, 255, 255); // Fondo blanco
    pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F'); // Dibuja un rectángulo blanco que cubre toda la página

    pdf.setFontSize(14);
    pdf.text(`Paciente: pepe`, 10, yPos);
    yPos += 10;

    console.log(moodTracker);
    console.log(sleepTracker);
    console.log(sessionTherapy);

    // Función para añadir datos al PDF
    const addDataToPdf = (title: string, data: any[]) => {
      if (!Array.isArray(data)) {
        console.error(`${title} is not an array`);
        return;
      }
      pdf.text(`${title}:`, 10, yPos);
      yPos += 10;
      data.forEach((item, index) => {
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            pdf.text(`${key}: ${item[key]}`, 10, yPos);
            yPos += 10;
            checkPageHeight();
          }
        }
        yPos += 10; // Espacio entre objetos
        checkPageHeight();
      });
    };

    // Añadir moodTracker, sleepTracker y sessionTherapy al PDF
    addDataToPdf('Mood Tracker', moodTracker);
    addDataToPdf('Sleep Tracker', sleepTracker);
    addDataToPdf('Session Therapy', sessionTherapy);

    // Save the PDF
    pdf.save('archivo.pdf');
  }
}
