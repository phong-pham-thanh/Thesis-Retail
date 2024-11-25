import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseReceiptGoodComponent } from './analyse-receipt-good.component';

describe('AnalyseReceiptGoodComponent', () => {
  let component: AnalyseReceiptGoodComponent;
  let fixture: ComponentFixture<AnalyseReceiptGoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyseReceiptGoodComponent]
    });
    fixture = TestBed.createComponent(AnalyseReceiptGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
