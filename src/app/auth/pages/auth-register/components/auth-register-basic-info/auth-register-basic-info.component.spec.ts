import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterBasicInfoComponent } from './auth-register-basic-info.component';

describe('AuthRegisterBasicInfoComponent', () => {
  let component: AuthRegisterBasicInfoComponent;
  let fixture: ComponentFixture<AuthRegisterBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthRegisterBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
