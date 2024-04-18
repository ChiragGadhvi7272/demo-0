import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EinOrTaxIdComponent } from './ein-or-tax-id.component';

describe('EinOrTaxIdComponent', () => {
  let component: EinOrTaxIdComponent;
  let fixture: ComponentFixture<EinOrTaxIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EinOrTaxIdComponent]
    });
    fixture = TestBed.createComponent(EinOrTaxIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
