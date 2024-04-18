import { TestBed } from '@angular/core/testing';

import { ErpSyncService } from './erp-sync.service';

describe('ErpSyncService', () => {
  let service: ErpSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErpSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
