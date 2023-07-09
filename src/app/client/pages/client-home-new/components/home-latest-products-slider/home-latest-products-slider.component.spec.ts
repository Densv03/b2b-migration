import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLatestProductsSliderComponent } from './home-latest-products-slider.component';

describe('HomeLatestProductsSliderComponent', () => {
  let component: HomeLatestProductsSliderComponent;
  let fixture: ComponentFixture<HomeLatestProductsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLatestProductsSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLatestProductsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
