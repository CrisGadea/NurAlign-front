import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TherapistCalendarComponent } from './therapist-calendar.component';
import * as moment from 'moment';


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
      declarations: [TherapistCalendarComponent, MockHeaderVComponent, MockFooterVComponent ]
    });
    fixture = TestBed.createComponent(TherapistCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('do sessionByFetch',()=>{
    const testDate = { value: 23 };//clickea este boton
    const expectedDate = moment('2024-05-23');//fecha esperada
    component.dateSelect = moment('2024-05');//se setea la fecha y el mes actual
    component.clickDay(testDate);

    expect(component.popupDate).toBe(expectedDate.format("DD/MM/YYYY"));
    
  })
});
