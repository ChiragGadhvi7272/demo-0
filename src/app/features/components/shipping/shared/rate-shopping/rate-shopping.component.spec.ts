import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateShoppingComponent } from './rate-shopping.component';

describe('RateShoppingComponent', () => {
  let component: RateShoppingComponent;
  let fixture: ComponentFixture<RateShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateShoppingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
