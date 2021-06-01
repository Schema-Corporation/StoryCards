import { TestBed } from '@angular/core/testing';

import { RolePlayingGuestService } from './role-playing-guest.service';

describe('RolePlayingGuestService', () => {
  let service: RolePlayingGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolePlayingGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
