import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipToLocationsComponent } from './ship-to-locations.component';

describe('ShipToLocationsComponent', () => {
  let component: ShipToLocationsComponent;
  let fixture: ComponentFixture<ShipToLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipToLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipToLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
