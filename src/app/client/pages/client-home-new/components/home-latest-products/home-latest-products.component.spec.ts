import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLatestProductsComponent } from './home-latest-products.component';

describe('HomeLatestProductsComponent', () => {
  let component: HomeLatestProductsComponent;
  let fixture: ComponentFixture<HomeLatestProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLatestProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLatestProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
