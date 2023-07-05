import { TestBed } from '@angular/core/testing';

import { MaterialExampleService } from './material-example.service';

describe('MaterialExampleService', () => {
  let service: MaterialExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
