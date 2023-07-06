import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPostingCompleteComponent } from './product-posting-complete.component';

describe('ProductPostingCompleteComponent', () => {
  let component: ProductPostingCompleteComponent;
  let fixture: ComponentFixture<ProductPostingCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPostingCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPostingCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
