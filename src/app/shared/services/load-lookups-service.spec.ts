import { TestBed } from '@angular/core/testing';

import { LoadLookupsService } from './load-lookups-service';

describe('LoadLookupsServiceService', () => {
  let service: LoadLookupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadLookupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
