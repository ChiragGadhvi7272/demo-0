import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateUserDetailsComponent } from './create-update-user-details.component';

describe('CreateUpdateUserDetailsComponent', () => {
  let component: CreateUpdateUserDetailsComponent;
  let fixture: ComponentFixture<CreateUpdateUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateUserDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
