import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterSupplierCompanyInfoComponent } from './auth-register-supplier-company-info.component';

describe('AuthRegisterSupplierBasicInfoComponent', () => {
  let component: AuthRegisterSupplierCompanyInfoComponent;
  let fixture: ComponentFixture<AuthRegisterSupplierCompanyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthRegisterSupplierCompanyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterSupplierCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
