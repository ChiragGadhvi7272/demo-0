import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicExportDetailsComponent } from './electronic-export-details.component';

describe('ElectronicExportDetailsComponent', () => {
  let component: ElectronicExportDetailsComponent;
  let fixture: ComponentFixture<ElectronicExportDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronicExportDetailsComponent]
    });
    fixture = TestBed.createComponent(ElectronicExportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
