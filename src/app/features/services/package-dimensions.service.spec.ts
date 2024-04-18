import { TestBed } from '@angular/core/testing';

import { PackageDimensionsService } from './package-dimensions.service';

describe('PackageDimensionsService', () => {
  let service: PackageDimensionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageDimensionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
