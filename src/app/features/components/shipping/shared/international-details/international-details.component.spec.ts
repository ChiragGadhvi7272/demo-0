import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalDetailsComponent } from './international-details.component';

describe('InternationalDetailsComponent', () => {
  let component: InternationalDetailsComponent;
  let fixture: ComponentFixture<InternationalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
