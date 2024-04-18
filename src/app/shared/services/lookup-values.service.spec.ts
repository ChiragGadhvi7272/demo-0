import { TestBed } from '@angular/core/testing';

import { LookupValuesService } from './lookup-values.service';

describe('LookupValuesService', () => {
  let service: LookupValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookupValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
