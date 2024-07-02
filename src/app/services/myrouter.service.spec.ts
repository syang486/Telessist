import { TestBed } from '@angular/core/testing';

import { MyrouterService } from './myrouter.service';

describe('MyrouterService', () => {
  let service: MyrouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyrouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
