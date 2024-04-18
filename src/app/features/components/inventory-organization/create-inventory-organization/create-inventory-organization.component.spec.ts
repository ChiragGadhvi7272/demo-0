import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventoryOrganizationComponent } from './create-inventory-organization.component';

describe('CreateInventoryOrganizationComponent', () => {
  let component: CreateInventoryOrganizationComponent;
  let fixture: ComponentFixture<CreateInventoryOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInventoryOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInventoryOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
