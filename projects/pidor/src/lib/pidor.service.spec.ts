import { TestBed } from '@angular/core/testing';

import { PidorService } from './pidor.service';

describe('PidorService', () => {
  let service: PidorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PidorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
