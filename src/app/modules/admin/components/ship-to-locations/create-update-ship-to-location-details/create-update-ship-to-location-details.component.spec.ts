import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateShipToLocationDetailsComponent } from './create-update-ship-to-location-details.component';

describe('CreateUpdateShipToLocationDetailsComponent', () => {
  let component: CreateUpdateShipToLocationDetailsComponent;
  let fixture: ComponentFixture<CreateUpdateShipToLocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateShipToLocationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateShipToLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
