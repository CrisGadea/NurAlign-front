import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { DashboardComponent } from './dashboard.component';


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


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent,MockHeaderVComponent, MockFooterVComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
