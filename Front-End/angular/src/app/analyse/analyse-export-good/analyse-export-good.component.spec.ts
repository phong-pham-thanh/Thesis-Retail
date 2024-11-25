import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseExportGoodComponent } from './analyse-export-good.component';

describe('AnalyseExportGoodComponent', () => {
  let component: AnalyseExportGoodComponent;
  let fixture: ComponentFixture<AnalyseExportGoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyseExportGoodComponent]
    });
    fixture = TestBed.createComponent(AnalyseExportGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
