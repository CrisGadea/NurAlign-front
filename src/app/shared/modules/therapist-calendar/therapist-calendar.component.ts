import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment'
import { TherapistCalendarService } from 'src/app/core/services/therapist-calendar.service';

@Component({
  selector: 'app-therapist-calendar',
  templateUrl: './therapist-calendar.component.html',
  styleUrls: ['./therapist-calendar.component.css'],

})
export class TherapistCalendarComponent implements OnInit {

  turnForm = this.fb.group({
    therapistId: ['',Validators.required],
    namePacient: ['',Validators.required],
    effectiveDate: ['',Validators.required],
    turnTime: ['',Validators.required],
  });

  turns:any =[]; 

  UltimosTurnos = [
    { namePacient: '', effectiveDate: '', turnTime: '' }];

  TurnPacient = [
    { namePacient: '', effectiveDate: '', turnTime: '' }];


  

  week: string[] = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
  ];

  monthSelect: any[] = [];
  dateSelect: any;
  dateValue: any;
  popupDate: string = ''; 
  isPopupVisible: boolean = false; 
  isPopupVisible2: boolean = false; 
  popUpTurnByFecha:any[]= [];
  userId!: string | null;

  constructor(private service:TherapistCalendarService, private fb: FormBuilder) {
    
   }

  ngOnInit(): void {

      this.userId = localStorage.getItem('userId');
     this.turns= this.service.getTurns(this.userId).subscribe(
        data => {        
          this.TurnPacient = data;
          this.dameTurnosFuturos();
        },
        error => {
          console.error("no se encontro los turnos del terapeuta",error);
        }
      );
    const currentDate = moment();
    //se le suma uno para que el rango sea de 1 a 12
    this.getDaysFromDate(currentDate.month() + 1, currentDate.year());
    
  }




  

  getDaysFromDate(month: number, year: number): void {
  //obtiene el primer dia del mes
    const startDate = moment(`${year}-${month}-01`);
    //obtiene el ultimo dia del mes
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;


    //te da los dias que exite entre la fecha de inicio y la fecha final del mes
    const numberDays = endDate.date();


//se genera el array de los dias
    const arrayDays = Array.from({ length: numberDays }, (_, i) => {
      //como los arrays empiezan en 0 se le suma uno
      const day = i + 1;
      //permite saber que dia de la semana es. Basicamente guardas el dia
      const dayObject = moment(`${year}-${month}-${day}`);
      return {
        name: dayObject.format("dddd"),
        value: day,
        indexWeek: dayObject.isoWeekday()
      };
    });
//se le asigna a mount select la colceccion de dias el array de todos los dias
    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number): void {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.month() + 1, prevDate.year());
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.month() + 1, nextDate.year());
    }
  }

  dameTurnosFuturos(): void {
    const diaActual = moment();
    this.UltimosTurnos = []; // Limpiamos el array antes de agregar nuevos turnos

    // Filtrar los turnos futuros
    const turnosFuturos = this.TurnPacient.filter(turno => {
        const fechaTurno = moment(turno.effectiveDate, 'YYYY-MM-DD');
        return fechaTurno.isAfter(diaActual);
    });

    // Ordenar los turnos futuros por fecha
    turnosFuturos.sort((a, b) => {
        const fechaTurnoA = moment(a.effectiveDate, 'YYYY-MM-DD');
        const fechaTurnoB = moment(b.effectiveDate, 'YYYY-MM-DD');
        return fechaTurnoA.diff(fechaTurnoB);
    });

    // Limitar la cantidad de turnos agregados a 10
    const cantidadTurnos = Math.min(turnosFuturos.length, 10);
    for (let i = 0; i < cantidadTurnos; i++) {
        this.UltimosTurnos.push(turnosFuturos[i]);
    }
}



  clickDay(day: { value: number }): void {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
    this.popupDate = objectDate.format('DD-MM-YYYY');
    
    
    for (let i = 0; i < this.TurnPacient.length; i++) {
      const turno = this.TurnPacient[i];
      const fechaTurno = moment(turno.effectiveDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
      this.popupDate = objectDate.format('DD/MM/YYYY'); // Cambia el formato a 'DD/MM/YYYY'

    if(fechaTurno === this.popupDate)
      {
        this.popUpTurnByFecha.push(turno);

      }
    }

    this.isPopupVisible = true; 

  }
  



  closePopup(): void {
    this.popUpTurnByFecha = []; // Vaciar el array popUpTurnByFecha
    this.isPopupVisible = false; // Cerrar el pop-up
  }


  generateTurn(): void {
    const formValues = this.turnForm.value;
    formValues.effectiveDate = moment(this.popupDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

    const therapistId = this.userId; // Ajusta esto al valor correcto según tu lógica
    const effectiveDate = moment(this.popupDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

    // Usa patchValue para actualizar los valores en el formulario
    this.turnForm.patchValue({
        therapistId: therapistId,
        effectiveDate: effectiveDate
    });

    if (this.turnForm.valid) {
      this.service.generateTurn(this.turnForm.value).subscribe(
        turn => {
          alert("Turno creado con éxito");
          window.location.reload();
        },
        error => {
          alert('No se puede crear el Turno, verifique los datos ingresados');
          console.error('Error creating turn', error);
        }
      );
    } else {
      Object.keys(this.turnForm.controls).forEach(key => {
        const control = this.turnForm.get(key);
        if (control) {
          console.log(`${key} - Valido: ${control.valid} - Valor: ${control.value}`);
        }
      });
    }
  }


}