import { TestBed } from '@angular/core/testing';

import { CarrierConfigurationsService } from './carrier-configurations.service';

describe('CarrierConfigurationsService', () => {
  let service: CarrierConfigurationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrierConfigurationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
