import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientProfileSavedOffersComponent } from './client-profile-saved-offers.component';

describe('ClientProfileSavedComponent', () => {
  let component: ClientProfileSavedOffersComponent;
  let fixture: ComponentFixture<ClientProfileSavedOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientProfileSavedOffersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfileSavedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
