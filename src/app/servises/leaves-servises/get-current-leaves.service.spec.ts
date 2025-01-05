import { TestBed } from '@angular/core/testing';

import { GetCurrentLeavesService } from './get-current-leaves.service';

describe('GetCurrentLeavesService', () => {
  let service: GetCurrentLeavesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCurrentLeavesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
