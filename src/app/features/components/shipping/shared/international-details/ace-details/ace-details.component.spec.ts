import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceDetailsComponent } from './ace-details.component';

describe('AceDetailsComponent', () => {
  let component: AceDetailsComponent;
  let fixture: ComponentFixture<AceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
