import { TestBed } from '@angular/core/testing';

import { SharedCustomerService } from './shared-customer.service';

describe('SharedCustomerService', () => {
  let service: SharedCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
