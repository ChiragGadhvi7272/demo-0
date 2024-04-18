import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocShipToComponent } from './adhoc-ship-to.component';

describe('AdhocShipToComponent', () => {
  let component: AdhocShipToComponent;
  let fixture: ComponentFixture<AdhocShipToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocShipToComponent]
    });
    fixture = TestBed.createComponent(AdhocShipToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
