import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceManagementFormComponent } from './price-management-form.component';

describe('PriceManagementFormComponent', () => {
  let component: PriceManagementFormComponent;
  let fixture: ComponentFixture<PriceManagementFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceManagementFormComponent]
    });
    fixture = TestBed.createComponent(PriceManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
