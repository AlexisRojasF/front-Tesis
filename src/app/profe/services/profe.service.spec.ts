import { TestBed } from '@angular/core/testing';

import { profeService } from './profe.service';

describe('profeService', () => {
  let service: profeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(profeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
