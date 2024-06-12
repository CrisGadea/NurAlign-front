import { Component } from '@angular/core';

interface Paciente {
  nombre: string;
  HorasSuenio: boolean;
  Animo: boolean;
  PostSession: boolean;
  Medicacion: boolean;
}
@Component({
  selector: 'app-pacients',
  templateUrl: './pacients.component.html',
  styleUrls: ['./pacients.component.css'],

})
export class PacientsComponent {
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  pacientes: Paciente[] = [
    { nombre: 'Juan Carlos', HorasSuenio: false, Animo: false, PostSession: false, Medicacion: false },
    { nombre: 'María', HorasSuenio: false, Animo: false, PostSession: false, Medicacion: false },
    { nombre: 'Pedro', HorasSuenio: false, Animo: false, PostSession: false, Medicacion: false },
    { nombre: 'Ana', HorasSuenio: false, Animo: false, PostSession: false, Medicacion: false },
    { nombre: 'Eduardo', HorasSuenio: false, Animo: false, PostSession: false, Medicacion: false },
    { nombre: 'Marío', HorasSuenio: false, Animo: false, PostSession: false, Medicacion: false },
    { nombre: 'Pepe', HorasSuenio: false, Animo: false, PostSession: false, Medicacion: false },
    { nombre: 'Jorge', HorasSuenio: false, Animo: false, PostSession: false, Medicacion: false },
  ];


}
