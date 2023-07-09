import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterBuyerCompanyInfoComponent } from './auth-register-buyer-company-info.component';

describe('AuthRegisterCompanyInfoComponent', () => {
  let component: AuthRegisterBuyerCompanyInfoComponent;
  let fixture: ComponentFixture<AuthRegisterBuyerCompanyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthRegisterBuyerCompanyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterBuyerCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
