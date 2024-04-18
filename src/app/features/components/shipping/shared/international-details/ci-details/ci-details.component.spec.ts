import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiDetailsComponent } from './ci-details.component';

describe('CiDetailsComponent', () => {
  let component: CiDetailsComponent;
  let fixture: ComponentFixture<CiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
