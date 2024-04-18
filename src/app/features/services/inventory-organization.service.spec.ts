import { TestBed } from '@angular/core/testing';

import { InventoryOrganizationService } from './inventory-organization.service';

describe('InventoryOrganizationService', () => {
  let service: InventoryOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
