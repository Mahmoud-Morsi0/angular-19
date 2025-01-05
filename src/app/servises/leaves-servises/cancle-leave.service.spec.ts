import { TestBed } from '@angular/core/testing';

import { CancleLeaveService } from './cancle-leave.service';

describe('CancleLeaveService', () => {
  let service: CancleLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancleLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
