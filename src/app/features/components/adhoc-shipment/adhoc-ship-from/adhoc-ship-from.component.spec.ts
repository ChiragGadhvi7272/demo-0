import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocShipFromComponent } from './adhoc-ship-from.component';

describe('AdhocShipFromComponent', () => {
  let component: AdhocShipFromComponent;
  let fixture: ComponentFixture<AdhocShipFromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocShipFromComponent]
    });
    fixture = TestBed.createComponent(AdhocShipFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
