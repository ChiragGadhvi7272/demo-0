import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCustomerDetailsComponent } from './create-update-customer-details.component';

describe('CreateUpdateCustomerDetailsComponent', () => {
  let component: CreateUpdateCustomerDetailsComponent;
  let fixture: ComponentFixture<CreateUpdateCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateCustomerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
