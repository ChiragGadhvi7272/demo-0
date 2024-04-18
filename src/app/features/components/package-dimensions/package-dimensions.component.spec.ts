import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDimensionsComponent } from './package-dimensions.component';

describe('PackageDimensionsComponent', () => {
  let component: PackageDimensionsComponent;
  let fixture: ComponentFixture<PackageDimensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageDimensionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageDimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
