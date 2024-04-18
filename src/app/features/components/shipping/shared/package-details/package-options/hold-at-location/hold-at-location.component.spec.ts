import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldAtLocationComponent } from './hold-at-location.component';

describe('HoldAtLocationComponent', () => {
  let component: HoldAtLocationComponent;
  let fixture: ComponentFixture<HoldAtLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoldAtLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoldAtLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
