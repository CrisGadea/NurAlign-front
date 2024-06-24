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
    pdf.setFontSize(18); // Tamaño de fuente para el título del informe
    pdf.text(`Informe generado por NurAlign`,60, 15); // Título del informe con nombre del paciente
    pdf.setFontSize(14); // Restaurar tamaño de fuente regular
    yPos += 5; // Espacio antes de la línea
    pdf.setLineWidth(0.5); // Grosor de la línea
    pdf.line(10, yPos, pdf.internal.pageSize.width - 10, yPos); // Dibujar línea horizontal
    yPos += 5; 
    pdf.text(`Paciente: Pepe`,10, 45);
    yPos += 25;
  

    // Función para añadir datos al PDF
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
            if (key === 'moodLevel') {
              value = this.darFormatoAnimo(value); // Traducir nivel de ánimo
            }
      



            
            pdf.text(`${fieldMapping[key]}: ${value}`, 10, yPos); // Usar el título personalizado
            yPos += 10;
            checkPageHeight();
          }
        }
        yPos += 10; // Espacio entre objetos
        checkPageHeight();
      });
    };
    
    // Añadir moodTracker, sleepTracker y sessionTherapy al PDF
  if(moodTracker.length!==0){
    addDataToPdf('Seguimiento estado de animo', moodTracker, {
      effectiveDate: 'Fecha',
    });}
    if(sleepTracker.length!==0){
    addDataToPdf('Seguimiento sueño', sleepTracker, {
      effectiveDate: 'Fecha',
      bedTime:'Cuando se fue a dormir',
      sleepHours: 'Horas de sueño',
      anxiousFlag:' Estuvo ansioso',
      negativeThoughtsFlag:'Pensamientos negativos',
      sleepStraightFlag:'Durmio bien',

    });}
    if(sessionTherapy.length!==0){
    addDataToPdf('Seguimiento terapia', sessionTherapy, {
      effectiveDate: 'Fecha',
      sessionTime: 'Duración de la sesión',
      preSessionNotes:'Notas previas a la sesion',
      postSessionNotes:'Notas post-sesion',
      sessionFeel:'Conclucion de la sesion'
    });}
    // Save the PDF
    pdf.save('archivo.pdf');
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
    }}

  
}