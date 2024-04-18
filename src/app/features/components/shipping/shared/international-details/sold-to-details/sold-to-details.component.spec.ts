import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldToDetailsComponent } from './sold-to-details.component';

describe('SoldToDetailsComponent', () => {
  let component: SoldToDetailsComponent;
  let fixture: ComponentFixture<SoldToDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoldToDetailsComponent]
    });
    fixture = TestBed.createComponent(SoldToDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
