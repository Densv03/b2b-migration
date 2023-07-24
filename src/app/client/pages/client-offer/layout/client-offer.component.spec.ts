import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientProfileAddOfferComponent } from '../../client-profile/pages/client-profile-add-offer/layout/client-profile-add-offer.component';

describe('ClientProfileOfferComponent', () => {
  let component: ClientProfileOfferComponent;
  let fixture: ComponentFixture<ClientProfileAddOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientProfileOfferComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfileOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
