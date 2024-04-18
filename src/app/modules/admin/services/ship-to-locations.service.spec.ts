import { TestBed } from '@angular/core/testing';

import { ShipToLocationsService } from './ship-to-locations.service';

describe('ShipToLocationsService', () => {
  let service: ShipToLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipToLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
