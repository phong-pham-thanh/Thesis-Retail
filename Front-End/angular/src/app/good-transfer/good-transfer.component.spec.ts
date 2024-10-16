import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodTransferComponent } from './good-transfer.component';

describe('GoodTransferComponent', () => {
  let component: GoodTransferComponent;
  let fixture: ComponentFixture<GoodTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoodTransferComponent]
    });
    fixture = TestBed.createComponent(GoodTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
