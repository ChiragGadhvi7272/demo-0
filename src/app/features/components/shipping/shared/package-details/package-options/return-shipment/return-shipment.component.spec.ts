import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnShipmentComponent } from './return-shipment.component';

describe('ReturnShipmentComponent', () => {
  let component: ReturnShipmentComponent;
  let fixture: ComponentFixture<ReturnShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnShipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
