import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientProfileMyOfferChatsComponent } from 'src/app/client/pages/client-profile/pages/client-profile-my-offer-chats/layout/client-profile-my-offer-chats.component';

describe('ClientProfileChatComponent', () => {
  let component: ClientProfileMyOfferChatsComponent;
  let fixture: ComponentFixture<ClientProfileOfferChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientProfileOfferChatComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfileOfferChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
