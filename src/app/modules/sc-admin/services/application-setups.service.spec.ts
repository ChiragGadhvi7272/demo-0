import { TestBed } from '@angular/core/testing';

import { ApplicationSetupsService } from './application-setups.service';

describe('ApplicationSetupsService', () => {
  let service: ApplicationSetupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationSetupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
