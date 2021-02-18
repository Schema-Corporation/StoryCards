import { TestBed } from '@angular/core/testing';

import { RolePlayingHostService } from './role-playing-host.service';

describe('RolePlayingHostService', () => {
  let service: RolePlayingHostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolePlayingHostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
