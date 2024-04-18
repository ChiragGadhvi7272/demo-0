import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierConfigurationComponent } from './carrier-configuration.component';

describe('CarrierConfigurationComponent', () => {
  let component: CarrierConfigurationComponent;
  let fixture: ComponentFixture<CarrierConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrierConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
