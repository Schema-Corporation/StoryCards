import { TestBed } from '@angular/core/testing';

import { GuestTurnService } from './guest-turn.service';

describe('GuestTurnService', () => {
  let service: GuestTurnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestTurnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
