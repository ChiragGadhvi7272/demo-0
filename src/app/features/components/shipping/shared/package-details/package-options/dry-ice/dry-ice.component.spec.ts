import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DryIceComponent } from './dry-ice.component';

describe('DryIceComponent', () => {
  let component: DryIceComponent;
  let fixture: ComponentFixture<DryIceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DryIceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DryIceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
