import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UscoDetailsComponent } from './usco-details.component';

describe('UscoDetailsComponent', () => {
  let component: UscoDetailsComponent;
  let fixture: ComponentFixture<UscoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UscoDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UscoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
