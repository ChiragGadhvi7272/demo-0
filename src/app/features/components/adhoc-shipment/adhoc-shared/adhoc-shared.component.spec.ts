import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocSharedComponent } from './adhoc-shared.component';

describe('AdhocSharedComponent', () => {
  let component: AdhocSharedComponent;
  let fixture: ComponentFixture<AdhocSharedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocSharedComponent]
    });
    fixture = TestBed.createComponent(AdhocSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
