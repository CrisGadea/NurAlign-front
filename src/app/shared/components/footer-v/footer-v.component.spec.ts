import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterVComponent } from './footer-v.component';

describe('FooterVComponent', () => {
  let component: FooterVComponent;
  let fixture: ComponentFixture<FooterVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterVComponent]
    });
    fixture = TestBed.createComponent(FooterVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
