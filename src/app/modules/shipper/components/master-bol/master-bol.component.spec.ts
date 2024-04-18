import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBolComponent } from './master-bol.component';

describe('MasterBolComponent', () => {
  let component: MasterBolComponent;
  let fixture: ComponentFixture<MasterBolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterBolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
