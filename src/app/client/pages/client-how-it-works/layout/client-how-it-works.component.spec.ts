import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientHowItWorksComponent } from './client-how-it-works.component';

describe('ClientHowItWorksComponent', () => {
  let component: ClientHowItWorksComponent;
  let fixture: ComponentFixture<ClientHowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientHowItWorksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
