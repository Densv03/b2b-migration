import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCategoryDropdownsComponent } from './ngx-category-dropdowns.component';

describe('NgxCategoryDropdownsComponent', () => {
  let component: NgxCategoryDropdownsComponent;
  let fixture: ComponentFixture<NgxCategoryDropdownsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxCategoryDropdownsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCategoryDropdownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
