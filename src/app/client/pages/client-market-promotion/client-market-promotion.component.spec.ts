import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMarketPromotionComponent } from './client-market-promotion.component';

describe('ClientMarketPromotionComponent', () => {
  let component: ClientMarketPromotionComponent;
  let fixture: ComponentFixture<ClientMarketPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMarketPromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMarketPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
