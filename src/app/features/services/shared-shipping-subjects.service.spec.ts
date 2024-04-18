import { TestBed } from '@angular/core/testing';

import { SharedShippingSubjectsService } from './shared-shipping-subjects.service';

describe('SharedShippingSubjectsService', () => {
  let service: SharedShippingSubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedShippingSubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
