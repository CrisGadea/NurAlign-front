import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacientsComponent } from './pacients.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { GeneratorPdfService } from 'src/app/core/services/generatorPdf.service';
import { InformService } from 'src/app/core/services/inform.service';
import { GeneratorService } from 'src/app/core/services/generator.service';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

describe('PacientsComponent', () => {
  let component: PacientsComponent;
  let fixture: ComponentFixture<PacientsComponent>;
@Component({
  selector: 'app-header-session',
  template: '<div>Mock Header</div>'
})
class MockHeaderVComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PacientsComponent,MockHeaderVComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatCardModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        DatePipe,
        GeneratorPdfService,
        InformService,
        GeneratorService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('que no se pueda crear un informe/Grafico si no completo los datos', () => {
    expect(component.isFormValid).toBeFalse;
    //deberia ser falso porque no se cargo nada
  });
  it('debería permitir generar un informe si se completan los datos', () => {
    component.selectedPatient = { id: 1, name: 'pepe' };
    component.startDate = new Date();
    component.endDate = new Date();
    component.reportType = 'informe';
    component.horassuenio = true;
    fixture.detectChanges();

    expect(component.isFormValid()).toBeTrue();
  });

  it('debería permitir generar un Grafico si se completan los datos', () => {
    component.selectedPatient = { id: 1, name: 'pepe' };
    component.startDate = new Date();
    component.endDate = new Date();
    component.reportType = 'grafico';
    component.horassuenio = true;
   

    expect(component.isFormValid()).toBeTrue();
  });
 


  // Más pruebas según sea necesario
});
