import { TestBed } from '@angular/core/testing';

import { GetHistoryLeavesService } from './get-history-leaves.service';

describe('GetHistoryLeavesService', () => {
  let service: GetHistoryLeavesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetHistoryLeavesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
