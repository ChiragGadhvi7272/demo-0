import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLabelsComponent } from './view-labels.component';

describe('ViewLabelsComponent', () => {
  let component: ViewLabelsComponent;
  let fixture: ComponentFixture<ViewLabelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLabelsComponent]
    });
    fixture = TestBed.createComponent(ViewLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
