import { TestBed } from '@angular/core/testing';

import { ShipperGuard } from './shipper.guard';

describe('ShipperGuard', () => {
  let guard: ShipperGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShipperGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
