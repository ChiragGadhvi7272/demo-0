import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNumbersComponent } from './account-numbers.component';

describe('AccountNumbersComponentComponent', () => {
  let component: AccountNumbersComponent;
  let fixture: ComponentFixture<AccountNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountNumbersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
