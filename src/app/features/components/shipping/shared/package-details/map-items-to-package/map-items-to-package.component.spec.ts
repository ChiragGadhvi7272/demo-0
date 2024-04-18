import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapItemsToPackageComponent } from './map-items-to-package.component';

describe('MapItemsToPackageComponent', () => {
  let component: MapItemsToPackageComponent;
  let fixture: ComponentFixture<MapItemsToPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapItemsToPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapItemsToPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
