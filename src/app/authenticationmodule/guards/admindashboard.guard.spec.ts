import { TestBed } from '@angular/core/testing';

import { AdmindashboardGuard } from './admindashboard.guard';

describe('AdmindashboardGuard', () => {
  let guard: AdmindashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdmindashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
