import { TestBed } from '@angular/core/testing';

import { SharedShippingUtilService } from './shared-shipping-util.service';

describe('SharedShippingUtilService', () => {
  let service: SharedShippingUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedShippingUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
