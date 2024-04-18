import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocCarrierDetailsComponent } from './adhoc-carrier-details.component';

describe('AdhocCarrierDetailsComponent', () => {
  let component: AdhocCarrierDetailsComponent;
  let fixture: ComponentFixture<AdhocCarrierDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocCarrierDetailsComponent]
    });
    fixture = TestBed.createComponent(AdhocCarrierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
