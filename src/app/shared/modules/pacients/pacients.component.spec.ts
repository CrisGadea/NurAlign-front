import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientsComponent } from './pacients.component';

describe('PacientsComponent', () => {
  let component: PacientsComponent;
  let fixture: ComponentFixture<PacientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacientsComponent]
    });
    fixture = TestBed.createComponent(PacientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
