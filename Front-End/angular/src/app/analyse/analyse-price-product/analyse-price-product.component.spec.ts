import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysePriceProductComponent } from './analyse-price-product.component';

describe('AnalysePriceProductComponent', () => {
  let component: AnalysePriceProductComponent;
  let fixture: ComponentFixture<AnalysePriceProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysePriceProductComponent]
    });
    fixture = TestBed.createComponent(AnalysePriceProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
