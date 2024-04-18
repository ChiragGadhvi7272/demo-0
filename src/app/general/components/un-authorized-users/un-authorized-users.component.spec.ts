import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthorizedUsersComponent } from './un-authorized-users.component';

describe('UnAuthorizedUsersComponent', () => {
  let component: UnAuthorizedUsersComponent;
  let fixture: ComponentFixture<UnAuthorizedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnAuthorizedUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnAuthorizedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
