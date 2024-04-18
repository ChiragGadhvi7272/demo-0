import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cn22DetailsComponent } from './cn22-details.component';

describe('Cn22DetailsComponent', () => {
  let component: Cn22DetailsComponent;
  let fixture: ComponentFixture<Cn22DetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cn22DetailsComponent]
    });
    fixture = TestBed.createComponent(Cn22DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
