import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseBillByMonthComponent } from './analyse-bill-by-month.component';

describe('AnalyseBillByMonthComponent', () => {
  let component: AnalyseBillByMonthComponent;
  let fixture: ComponentFixture<AnalyseBillByMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyseBillByMonthComponent]
    });
    fixture = TestBed.createComponent(AnalyseBillByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
