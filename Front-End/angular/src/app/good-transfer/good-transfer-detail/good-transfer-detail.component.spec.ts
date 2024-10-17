import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodTransferDetailComponent } from './good-transfer-detail.component';

describe('GoodTransferDetailComponent', () => {
  let component: GoodTransferDetailComponent;
  let fixture: ComponentFixture<GoodTransferDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoodTransferDetailComponent]
    });
    fixture = TestBed.createComponent(GoodTransferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
