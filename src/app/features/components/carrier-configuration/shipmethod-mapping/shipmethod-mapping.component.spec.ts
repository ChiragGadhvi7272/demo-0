import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmethodMappingComponent } from './shipmethod-mapping.component';

describe('ShipmethodMappingComponent', () => {
  let component: ShipmethodMappingComponent;
  let fixture: ComponentFixture<ShipmethodMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmethodMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmethodMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
