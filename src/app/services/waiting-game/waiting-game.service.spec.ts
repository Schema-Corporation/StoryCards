import { TestBed } from '@angular/core/testing';

import { WaitingGameService } from './waiting-game.service';

describe('WaitingGameService', () => {
  let service: WaitingGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitingGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
