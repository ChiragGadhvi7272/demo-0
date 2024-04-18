import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateShipFromLocationComponent } from './create-update-ship-from-location.component';

describe('CreateUpdateShipFromLocationComponent', () => {
  let component: CreateUpdateShipFromLocationComponent;
  let fixture: ComponentFixture<CreateUpdateShipFromLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateShipFromLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateShipFromLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
