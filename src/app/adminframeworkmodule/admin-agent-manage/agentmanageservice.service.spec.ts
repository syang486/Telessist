import { TestBed } from '@angular/core/testing';

import { AgentmanageserviceService } from './agentmanageservice.service';

describe('AgentmanageserviceService', () => {
  let service: AgentmanageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentmanageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
