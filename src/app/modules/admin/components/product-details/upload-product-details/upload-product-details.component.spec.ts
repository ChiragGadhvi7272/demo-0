import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProductDetailsComponent } from './upload-product-details.component';

describe('UploadProductDetailsComponent', () => {
  let component: UploadProductDetailsComponent;
  let fixture: ComponentFixture<UploadProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
