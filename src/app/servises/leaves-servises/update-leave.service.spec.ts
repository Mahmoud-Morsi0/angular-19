import { TestBed } from '@angular/core/testing';

import { UpdateLeaveService } from './update-leave.service';

describe('UpdateLeaveService', () => {
  let service: UpdateLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
