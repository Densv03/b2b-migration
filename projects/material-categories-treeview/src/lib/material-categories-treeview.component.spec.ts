import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCategoriesTreeviewComponent } from './material-categories-treeview.component';

describe('MaterialTreeviewComponent', () => {
  let component: MaterialCategoriesTreeviewComponent;
  let fixture: ComponentFixture<MaterialCategoriesTreeviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialCategoriesTreeviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialCategoriesTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
