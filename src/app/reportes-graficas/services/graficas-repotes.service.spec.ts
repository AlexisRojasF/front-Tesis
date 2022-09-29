import { TestBed } from '@angular/core/testing';

import { GraficasRepotesService } from './graficas-repotes.service';

describe('GraficasRepotesService', () => {
  let service: GraficasRepotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficasRepotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
