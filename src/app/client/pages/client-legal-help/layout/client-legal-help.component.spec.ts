import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientLegalHelpComponent } from './client-legal-help.component';

describe('ClientLegalHelpComponent', () => {
  let component: ClientLegalHelpComponent;
  let fixture: ComponentFixture<ClientLegalHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientLegalHelpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLegalHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
