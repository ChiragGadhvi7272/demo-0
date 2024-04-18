import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipFromLocationsComponent } from './ship-from-locations.component';

describe('ShipFromLocationsComponent', () => {
  let component: ShipFromLocationsComponent;
  let fixture: ComponentFixture<ShipFromLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipFromLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipFromLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
