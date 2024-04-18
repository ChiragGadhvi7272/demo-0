import { TestBed } from '@angular/core/testing';

import { SharedUtilService } from './shared-util.service';

describe('SharedUtilService', () => {
  let service: SharedUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
