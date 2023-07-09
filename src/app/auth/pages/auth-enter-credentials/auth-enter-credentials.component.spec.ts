import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEnterCredentialsComponent } from './auth-enter-credentials.component';

describe('AuthEnterCredentialsComponent', () => {
  let component: AuthEnterCredentialsComponent;
  let fixture: ComponentFixture<AuthEnterCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthEnterCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthEnterCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
