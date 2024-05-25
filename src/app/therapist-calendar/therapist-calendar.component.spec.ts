import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TherapistCalendarComponent } from './therapist-calendar.component';


@Component({
  selector: 'app-footer-v',
  template: '<div>Mock footer</div>'
})
class MockFooterVComponent {}

@Component({
  selector: 'app-header-v',
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


});
