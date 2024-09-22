import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailComponentComponent } from './retail-component.component';

describe('RetailComponentComponent', () => {
  let component: RetailComponentComponent;
  let fixture: ComponentFixture<RetailComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetailComponentComponent]
    });
    fixture = TestBed.createComponent(RetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
