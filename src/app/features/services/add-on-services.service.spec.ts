import { TestBed } from '@angular/core/testing';

import { AddOnServicesService } from './add-on-services.service';

describe('AddOnServicesService', () => {
  let service: AddOnServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddOnServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
