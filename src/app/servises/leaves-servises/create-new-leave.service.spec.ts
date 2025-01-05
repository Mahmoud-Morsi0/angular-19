import { TestBed } from '@angular/core/testing';

import { CreateNewLeaveService } from './create-new-leave.service';

describe('CreateNewLeaveService', () => {
  let service: CreateNewLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
