import { TestBed } from '@angular/core/testing';

import { ScShipperGuard } from './sc-shipper.guard';

describe('ScShipperGuard', () => {
  let guard: ScShipperGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ScShipperGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
