import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodTransferViewComponent } from './good-transfer-view.component';

describe('GoodTransferViewComponent', () => {
  let component: GoodTransferViewComponent;
  let fixture: ComponentFixture<GoodTransferViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoodTransferViewComponent]
    });
    fixture = TestBed.createComponent(GoodTransferViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
