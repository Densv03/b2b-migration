import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSubcategorySelectablePartComponent } from './ngx-subcategory-selectable-part.component';

describe('NgxSubcategorySelectablePartComponent', () => {
  let component: NgxSubcategorySelectablePartComponent;
  let fixture: ComponentFixture<NgxSubcategorySelectablePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSubcategorySelectablePartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSubcategorySelectablePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
