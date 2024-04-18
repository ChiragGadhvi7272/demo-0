import { TestBed } from '@angular/core/testing';

import { ProfileOptionsService } from './profile-options.service';

describe('ProfileOptionsService', () => {
  let service: ProfileOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
