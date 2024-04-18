import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocShipmentComponent } from './adhoc-shipment.component';

describe('AdhocShipmentComponent', () => {
  let component: AdhocShipmentComponent;
  let fixture: ComponentFixture<AdhocShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhocShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
