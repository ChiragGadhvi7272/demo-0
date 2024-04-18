import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePackageDimensionsComponent } from './create-package-dimensions.component';

describe('CreatePackageDimensionsComponent', () => {
  let component: CreatePackageDimensionsComponent;
  let fixture: ComponentFixture<CreatePackageDimensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePackageDimensionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePackageDimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
