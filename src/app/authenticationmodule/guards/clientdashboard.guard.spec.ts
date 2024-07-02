import { TestBed } from '@angular/core/testing';

import { ClientdashboardGuard } from './clientdashboard.guard';

describe('ClientdashboardGuard', () => {
  let guard: ClientdashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClientdashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
