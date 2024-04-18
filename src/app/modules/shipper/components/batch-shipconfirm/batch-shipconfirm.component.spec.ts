import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchShipconfirmComponent } from './batch-shipconfirm.component';

describe('BatchShipconfirmComponent', () => {
  let component: BatchShipconfirmComponent;
  let fixture: ComponentFixture<BatchShipconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchShipconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchShipconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
