import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSetupsComponent } from './application-setups.component';

describe('LoggerModeComponent', () => {
  let component: ApplicationSetupsComponent;
  let fixture: ComponentFixture<ApplicationSetupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationSetupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
