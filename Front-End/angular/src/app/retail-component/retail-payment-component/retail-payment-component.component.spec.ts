import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailPaymentComponentComponent } from './retail-payment-component.component';

describe('RetailPaymentComponentComponent', () => {
  let component: RetailPaymentComponentComponent;
  let fixture: ComponentFixture<RetailPaymentComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetailPaymentComponentComponent]
    });
    fixture = TestBed.createComponent(RetailPaymentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
