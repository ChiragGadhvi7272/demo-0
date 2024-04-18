import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntlUscoInfo } from './intl-usco-info.model';

describe('IntlUscoInfo', () => {
  let component: IntlUscoInfo;
  let fixture: ComponentFixture<IntlUscoInfo>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntlUscoInfo]
    });
    fixture = TestBed.createComponent(IntlUscoInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
