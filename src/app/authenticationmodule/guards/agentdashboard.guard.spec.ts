import { TestBed } from '@angular/core/testing';

import { AgentdashboardGuard } from './agentdashboard.guard';

describe('AgentdashboardGuard', () => {
  let guard: AgentdashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AgentdashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
