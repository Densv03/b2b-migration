import { TestBed } from '@angular/core/testing';

import { MaterialCategoriesTreeviewService } from './material-categories-treeview.service';

describe('MaterialTreeviewService', () => {
  let service: MaterialCategoriesTreeviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialCategoriesTreeviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
