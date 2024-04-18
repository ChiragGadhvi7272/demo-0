import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadShipToLocationDetailsComponent } from './upload-ship-to-location-details.component';

describe('UploadShipToLocationDetailsComponent', () => {
  let component: UploadShipToLocationDetailsComponent;
  let fixture: ComponentFixture<UploadShipToLocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadShipToLocationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadShipToLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
