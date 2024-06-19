import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class GeneratorPdfService {

  constructor() { }

  generatePdfFromEntities(entities: any[]) {
    const pdf = new jsPDF();

    // Configurar colores y estilos
    pdf.setTextColor(0, 0, 0); // Texto en color negro
    pdf.setFillColor(255, 255, 255); // Fondo blanco
    pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F'); // Dibuja un rectángulo blanco que cubre toda la página

    let yPos = 10; // Posición inicial del texto

    entities.forEach((entity, index) => {
      // Puedes personalizar el estilo del encabezado aquí
      pdf.setFontSize(14);
      pdf.text(`Paciente ID: pepe`, 10, yPos);
      yPos += 10;

      pdf.setFontSize(12);
      pdf.text(`Fecha efectiva: ${entity.effectiveDate}`, 10, yPos);
      yPos += 10;

      pdf.text(`Valor más alto: ${entity.highestValue}`, 10, yPos);
      yPos += 10;
      pdf.text(`Notas más altas: ${entity.highestNotes}`, 10, yPos);
      yPos += 10;

      pdf.text(`Valor más bajo: ${entity.lowestValue}`, 10, yPos);
      yPos += 10;
      pdf.text(`Notas más bajas: ${entity.lowestNotes}`, 10, yPos);
      yPos += 10;

      pdf.text(`Valor ansioso: ${entity.anxiousValue}`, 10, yPos);
      yPos += 10;
      pdf.text(`Notas ansiosas: ${entity.anxiousNotes}`, 10, yPos);
      yPos += 10;

      pdf.text(`Valor irritable: ${entity.irritableValue}`, 10, yPos);
      yPos += 10;
      pdf.text(`Notas irritables: ${entity.irritableNotes}`, 10, yPos);
      yPos += 20; // Espacio entre entradas
    });

    // Save the PDF
    pdf.save('archivo.pdf');
  }
}
