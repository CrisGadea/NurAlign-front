import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // Importar MatSelectModule
import * as moment from 'moment';

import { TherapistCalendarComponent } from './therapist-calendar.component';
import { TherapistCalendarService } from 'src/app/core/services/therapist-calendar.service';

@Component({
  selector: 'app-footer-session',
  template: '<div>Mock footer</div>'
})
class MockFooterVComponent {}

@Component({
  selector: 'app-header-session',
  template: '<div>Mock Header</div>'
})
class MockHeaderVComponent {}

describe('TherapistCalendarComponent', () => {
  let component: TherapistCalendarComponent;
  let fixture: ComponentFixture<TherapistCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule, // Agregar ReactiveFormsModule
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule // Agregar MatSelectModule
      ],
      declarations: [TherapistCalendarComponent, MockHeaderVComponent, MockFooterVComponent],
      providers: [TherapistCalendarService]
    });
    fixture = TestBed.createComponent(TherapistCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('que al hacer click en el dia me traiga la fecha', () => {
    const testDate = { value: 23 }; // clickea este botón
    const expectedDate = moment('2024-05-23'); // fecha esperada
    component.dateSelect = moment('2024-05'); // se setea la fecha y el mes actual
    component.clickDay(testDate);

    expect(component.popupDate).toBe(expectedDate.format("DD/MM/YYYY"));
  });

  it('debería abrir el popup', () => {
    const testDate = { value: 23 }; // clickea este botón
    component.clickDay(testDate);
    expect(component.isPopupVisible).toBe(true);
  });

  it('debería cerrar el popup', () => {
    const testDate = { value: 23 }; // clickea este botón
    component.clickDay(testDate);
    component.closePopup();
    expect(component.isPopupVisible).toBe(false);
  });
  it('debería ser distinto el mes', () => 
    {  const dateActual = component.dateSelect;
      
      component.changeMonth(-1);
      const datecambiado=component.dateSelect;
      expect(dateActual).not.toEqual(datecambiado);



    });
    it('debería ser igual el mes', () => 
      {  const dateActual = component.dateSelect;
        
        component.changeMonth(-1);
        component.changeMonth(1);
        const datecambiado=component.dateSelect;
        expect(dateActual).toEqual(datecambiado);
      });

      it('deberia darme los dias de ese mes', () => 
        { 
          const cantdias=29;
          
          component.getDaysFromDate(2, 2024)

          const diasobtenidos=component.monthSelect

          expect(cantdias).toEqual(diasobtenidos.length);


        });
        it('deberia darme una lista de todos los turnos', () => 
          {
              component.TurnPacient
              expect(10).toEqual(component.TurnPacient.length);
           });

           it('deberia darme una de los turnos del dia', () => 
            {
                component.TurnPacient;   
                component.dateSelect = moment('2024-05');
                component.clickDay({ value: 20 });
             
               const turnosobtenidos= component.popUpTurnByFecha;
               //devuelve 2 porque en el array ya estan cargados 
               //2 con el mismo pero deberia ser cambiado, 
               //porque agregas uno mas ese dia a la bdd y el test no funciona
                expect(2).toEqual(turnosobtenidos.length);
             });

   
});
