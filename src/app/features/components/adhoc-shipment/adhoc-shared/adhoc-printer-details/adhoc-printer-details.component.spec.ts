import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocPrinterDetailsComponent } from './adhoc-printer-details.component';

describe('AdhocPrinterDetailsComponent', () => {
  let component: AdhocPrinterDetailsComponent;
  let fixture: ComponentFixture<AdhocPrinterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocPrinterDetailsComponent]
    });
    fixture = TestBed.createComponent(AdhocPrinterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
