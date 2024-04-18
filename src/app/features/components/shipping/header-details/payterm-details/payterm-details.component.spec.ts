import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytermDetailsComponent } from './payterm-details.component';

describe('PaytermDetailsComponent', () => {
  let component: PaytermDetailsComponent;
  let fixture: ComponentFixture<PaytermDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaytermDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaytermDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
