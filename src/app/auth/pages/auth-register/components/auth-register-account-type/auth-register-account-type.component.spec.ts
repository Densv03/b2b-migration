import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterAccountTypeComponent } from './auth-register-account-type.component';

describe('AuthRegisterAccountTypeComponent', () => {
  let component: AuthRegisterAccountTypeComponent;
  let fixture: ComponentFixture<AuthRegisterAccountTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthRegisterAccountTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
