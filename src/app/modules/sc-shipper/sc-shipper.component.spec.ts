import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScShipperComponent } from './sc-shipper.component';

describe('ScShipperComponent', () => {
  let component: ScShipperComponent;
  let fixture: ComponentFixture<ScShipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScShipperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScShipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
