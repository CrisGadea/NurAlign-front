import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GeneratorService } from './generator.service';

@Injectable({
  providedIn: 'root'
})
export class GeneratorPdfService {

  constructor(private generatorService: GeneratorService) { }

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
    pdf.text(`Paciente: ${nombre}`, 10, 45);
    yPos += 25;

    const addDataToPdf = (title: string, data: any[], fieldMapping: Record<string, string>) => {
      if (!Array.isArray(data)) {
        console.error(`${title} is not an array`);
        return;
      }
      pdf.text(`${title}:`, 10, yPos);
      yPos += 10;
      data.forEach((item, index) => {
        for (const key in item) {
          if (item.hasOwnProperty(key) && fieldMapping[key]) {
            let value = item[key];
            if (key === 'highestValue' || key === 'lowestValue' || key === 'anxiousValue' || key === 'irritableValue') {
              value = this.darFormatoAnimo(value);
            }
            if (key === 'sessionFeel') {
              value = this.darFormatoAnimo(parseInt(value));
            }
            pdf.text(`${fieldMapping[key]}: ${value}`, 10, yPos);
            yPos += 10;
            checkPageHeight();
          }
        }
        yPos += 10;
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
        sessionFeel: 'Animo de la sesion'
      });
    }
    pdf.save('Informe de Carlos.pdf');
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
}
