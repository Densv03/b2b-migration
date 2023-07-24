import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientContactUsModalComponent } from './client-contact-us-modal.component';

describe('ClientContactUsModalComponent', () => {
  let component: ClientContactUsModalComponent;
  let fixture: ComponentFixture<ClientContactUsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientContactUsModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientContactUsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
