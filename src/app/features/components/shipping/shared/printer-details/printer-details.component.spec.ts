import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterDetailsComponent } from './printer-details.component';

describe('PrinterDetailsComponent', () => {
  let component: PrinterDetailsComponent;
  let fixture: ComponentFixture<PrinterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrinterDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrinterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
