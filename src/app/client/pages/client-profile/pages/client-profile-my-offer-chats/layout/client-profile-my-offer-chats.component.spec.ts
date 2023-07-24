import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientProfileMyOfferChatsComponent } from './client-profile-my-offer-chats.component';

describe('ClientProfileChatsComponent', () => {
  let component: ClientProfileOfferChatsComponent;
  let fixture: ComponentFixture<ClientProfileOfferChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientProfileMyOfferChatsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfileOfferChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
