import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseTopProductSaleComponent } from './analyse-top-product-sale.component';

describe('AnalyseTopProductSaleComponent', () => {
  let component: AnalyseTopProductSaleComponent;
  let fixture: ComponentFixture<AnalyseTopProductSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyseTopProductSaleComponent]
    });
    fixture = TestBed.createComponent(AnalyseTopProductSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
