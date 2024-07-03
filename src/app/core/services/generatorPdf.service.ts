import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GeneratorService } from './generator.service';
import { InformService } from './inform.service';

@Injectable({
  providedIn: 'root'
})
export class GeneratorPdfService {

  constructor(private generatorService: GeneratorService, private informService: InformService) { }

  generatePdfFromEntities(nombre: string, moodTracker: any[], sleepTracker: any[], sessionTherapy: any[]) {
    const pdf = new jsPDF();
    const pageHeight = pdf.internal.pageSize.height;
    const marginTop = 20;
    const marginBottom = 20;
    let yPos = marginTop;

    const checkPageHeight = (additionalHeight = 10) => {
      if (yPos + additionalHeight > pageHeight - marginBottom) {
        pdf.addPage();
        yPos = marginTop;
      }
    };

    pdf.setTextColor(0, 0, 0);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');
    pdf.setFontSize(18);
    pdf.text(`Informe generado por NurAlign`, 60, 15);
    pdf.setFontSize(14);
    yPos += 5;
    pdf.setLineWidth(0.5);
    pdf.line(10, yPos, pdf.internal.pageSize.width - 10, yPos);
    yPos += 5;
    pdf.setFontSize(20);
    pdf.text(`Paciente: ${nombre}`, 10, 45);
    yPos += 25;

    const addDataToPdf = (title: string, data: any[], fieldMapping: Record<string, string>) => {
      if (!Array.isArray(data) || data.length === 0) {
        return; // No hacer nada si los datos no son un array o están vacíos
      }
      
      pdf.setFontSize(18);
      // Imprimir el título solo una vez
      pdf.text(`${title}:`, 10, yPos);
    
      yPos += 10; // Ajuste para la siguiente línea después del título
      pdf.setFontSize(14);
      data.forEach((item, index) => {
        // Iterar sobre las propiedades del objeto 'item'
        for (const key in item) {
          if (item.hasOwnProperty(key) && fieldMapping[key]) {
            let value = item[key];
    
            // Dar formato especial a ciertos valores
            if (key === 'highestValue' || key === 'lowestValue' || key === 'anxiousValue' || key === 'irritableValue') {
              value = this.darFormatoAnimo(value);
            }
            if (key === 'sessionFeel') {
              value = this.darFormatoSession(parseInt(value));
            }

            if (key === 'anxiousFlag'||key === 'negativeThoughtsFlag'||key === 'sleepStraightFlag') {
              value = this.darFormatoSueño(parseInt(value));
            }
    
    
            // Ajustar posición y controlar altura de página
            const textLines = pdf.splitTextToSize(`${fieldMapping[key]}: ${value}`, pdf.internal.pageSize.width - 40);
            textLines.forEach((line: string) => {
              if (yPos + 10 > pageHeight - marginBottom) {
                pdf.addPage();
                yPos = marginTop;
              //  pdf.text(`${title}:`, 10, yPos); // Volver a imprimir el título en la nueva página
                yPos += 10; // Ajuste para la siguiente línea después del título en la nueva página
              }
              pdf.text(line, 20, yPos);
              yPos += 10; // Espacio entre líneas
            });
          }
        }
        yPos += 10; // Espacio entre elementos
        checkPageHeight();
      });
    };
    
    

    if (Array.isArray(moodTracker) && moodTracker.length !== 0) {
      addDataToPdf('Seguimiento estado de animo', moodTracker, {
        effectiveDate: 'Fecha',
        highestValue: 'Animo elevado',
        lowestValue: 'Animo Deprimido',
        anxiousValue: 'Animo Ansioso',
        irritableValue: 'Animo Irritable',
        highestNotes: 'Notas Animo elevado',
        lowestNotes: 'Notas Animo Deprimido',
        irritableNotes: 'Notas Animo Ansioso',
        anxiousNotes: 'Notas Animo Irritable'
      });
    }
    if (Array.isArray(sleepTracker) && sleepTracker.length !== 0) {
      addDataToPdf('Seguimiento sueño', sleepTracker, {
        effectiveDate: 'Fecha',
        bedTime: 'Cuando se fue a dormir',
        sleepHours: 'Horas de sueño',
        anxiousFlag: 'Estuvo ansioso',
        negativeThoughtsFlag: 'Pensamientos negativos',
        sleepStraightFlag: 'Durmio bien',
        sleepNotes: 'Notas Paciente'
      });
    }
    if (Array.isArray(sessionTherapy) && sessionTherapy.length !== 0) {
      addDataToPdf('Seguimiento terapia', sessionTherapy, {
        effectiveDate: 'Fecha',
        sessionTime: 'Duración de la sesión',
        preSessionNotes: 'Notas previas a la sesion',
        postSessionNotes: 'Notas post-sesion',
        sessionFeel: 'Como se sintio'
      });
    }
    pdf.save(nombre+'.pdf');


   
  }

  darFormatoAnimo(level: number): string {
    switch (level) {
      case 5:
        return 'Muy elevado';
      case 4:
        return 'Elevado';
      case 3:
        return 'Normal';
      case 2:
        return 'Levemente bajo';
      case 1:
        return 'Bajo';
      default:
        return 'Desconocido';
    }
    
  }


  darFormatoSession(level: number): string {
    switch (level) {
      case 5:
        return 'Muy bien';
      case 4:
        return 'Bien';
      case 3:
        return 'Regular';
      case 2:
        return 'Mal';
      case 1:
        return 'Muy mal';
      default:
        return 'Desconocido';
    }
    
  }
  darFormatoSueño(level: number): string {
    switch (level) {
      case 1:
        return 'si';
      case 0:
        return 'no';
      default:
        return 'valor desconocido'; // Manejar cualquier otro valor que no sea 1 o 0
    }
  }
  

}
