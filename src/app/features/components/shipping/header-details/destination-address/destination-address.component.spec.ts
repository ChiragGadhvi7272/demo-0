import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationAddressComponent } from './destination-address.component';

describe('DestinationAddressComponent', () => {
  let component: DestinationAddressComponent;
  let fixture: ComponentFixture<DestinationAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationAddressComponent]
    });
    fixture = TestBed.createComponent(DestinationAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
