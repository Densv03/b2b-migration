import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientPricingComponent } from './client-pricing.component';

describe('ClientPricingComponent', () => {
  let component: ClientPricingComponent;
  let fixture: ComponentFixture<ClientPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPricingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
