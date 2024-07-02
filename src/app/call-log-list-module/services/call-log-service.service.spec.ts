import { TestBed } from '@angular/core/testing';

import { CallLogServiceService } from './call-log-service.service';

describe('CallLogServiceService', () => {
  let service: CallLogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallLogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
