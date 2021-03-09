import { TestBed } from '@angular/core/testing';

import { WaitingScoresService } from './waiting-scores.service';

describe('WaitingScoresService', () => {
  let service: WaitingScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitingScoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
