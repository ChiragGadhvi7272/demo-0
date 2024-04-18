import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazmatDetailsComponent } from './hazmat-details.component';

describe('HazmatDetailsComponent', () => {
  let component: HazmatDetailsComponent;
  let fixture: ComponentFixture<HazmatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazmatDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HazmatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
