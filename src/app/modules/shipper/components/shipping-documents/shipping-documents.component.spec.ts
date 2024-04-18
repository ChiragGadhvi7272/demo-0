import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingDocumentsComponent } from './shipping-documents.component';

describe('ShippingDocumentsComponent', () => {
  let component: ShippingDocumentsComponent;
  let fixture: ComponentFixture<ShippingDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
