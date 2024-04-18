import { TestBed } from '@angular/core/testing';

import { ConsolidationDataService } from './consolidation-data.service';

describe('ConsolidationDataService', () => {
  let service: ConsolidationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsolidationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
