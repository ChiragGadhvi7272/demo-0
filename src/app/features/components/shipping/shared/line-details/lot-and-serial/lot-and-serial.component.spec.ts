import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotAndSerialComponent } from './lot-and-serial.component';

describe('LotAndSerialComponent', () => {
  let component: LotAndSerialComponent;
  let fixture: ComponentFixture<LotAndSerialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LotAndSerialComponent]
    });
    fixture = TestBed.createComponent(LotAndSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
