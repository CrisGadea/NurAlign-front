import { Component } from '@angular/core';
import { GeneratorPdfService } from 'src/app/core/services/generatorPdf.service';


@Component({
  selector: 'app-pacients',
  templateUrl: './pacients.component.html',
  styleUrls: ['./pacients.component.css'],

})
export class PacientsComponent {
  nombresPacientes: string[] = ['Carlos', 'María', 'Pedro', 'Ana','Eduardo', 'Marío', 'Pepe', 'Jorge'];
  horassuenio = false;
  estadodanimo = false;
  estadoanimosesion = false;
  medicacion = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;





















  constructor(private generatorPdfService: GeneratorPdfService) { }


  generarYDescargarPdf() {
    const entities = [
      {
        id: 1,
   
        effectiveDate: '2023-06-18',
        highestValue: 5,
        lowestValue: 3,
        anxiousValue: 2,
        irritableValue: 1,
        highestNotes: 'Se sintió muy bien.',
        lowestNotes: 'Estuvo un poco triste.',
        irritableNotes: 'Algo irritable.',
        anxiousNotes: 'Un poco ansioso.'
      },
      {
        id: 2,
      
        effectiveDate: '2023-06-19',
        highestValue: 5,
        lowestValue: 4,
        anxiousValue: 2,
        irritableValue: 1,
        highestNotes: 'Buen día en general.',
        lowestNotes: 'Sintió algo de tristeza.',
        irritableNotes: 'Levemente irritable.',
        anxiousNotes: 'Moderadamente ansiosa.'
      }
      // Agrega más entradas según sea necesario
    ];

    this.generatorPdfService.generatePdfFromEntities(entities);
  }}









