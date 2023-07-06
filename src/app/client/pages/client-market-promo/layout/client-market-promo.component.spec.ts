import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMarketPromoComponent } from './client-market-promo.component';

describe('ClientMarketPromoComponent', () => {
  let component: ClientMarketPromoComponent;
  let fixture: ComponentFixture<ClientMarketPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMarketPromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMarketPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
