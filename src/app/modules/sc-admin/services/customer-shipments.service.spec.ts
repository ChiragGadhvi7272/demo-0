import { TestBed } from '@angular/core/testing';

import { CustomerShipmentsService } from './customer-shipments.service';

describe('CustomerShipmentsService', () => {
  let service: CustomerShipmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerShipmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
