import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpSyncComponent } from './erp-sync.component';

describe('ErpSyncComponent', () => {
  let component: ErpSyncComponent;
  let fixture: ComponentFixture<ErpSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErpSyncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
