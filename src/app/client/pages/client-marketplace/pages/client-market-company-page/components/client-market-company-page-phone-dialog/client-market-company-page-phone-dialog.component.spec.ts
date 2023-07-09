import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMarketCompanyPagePhoneDialogComponent } from './client-market-company-page-phone-dialog.component';

describe('ClientMarketCompanyPagePhoneDialogComponent', () => {
  let component: ClientMarketCompanyPagePhoneDialogComponent;
  let fixture: ComponentFixture<ClientMarketCompanyPagePhoneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMarketCompanyPagePhoneDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMarketCompanyPagePhoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
