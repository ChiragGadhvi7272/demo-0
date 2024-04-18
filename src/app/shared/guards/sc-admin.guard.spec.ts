import { TestBed } from '@angular/core/testing';

import { ScAdminGuard } from './sc-admin.guard';

describe('ScAdminGuard', () => {
  let guard: ScAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ScAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
