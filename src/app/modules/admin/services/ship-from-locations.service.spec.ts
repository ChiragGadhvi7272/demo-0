import { TestBed } from '@angular/core/testing';

import { ShipFromLocationsService } from './ship-from-locations.service';

describe('ShipFromLocationsService', () => {
  let service: ShipFromLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipFromLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
