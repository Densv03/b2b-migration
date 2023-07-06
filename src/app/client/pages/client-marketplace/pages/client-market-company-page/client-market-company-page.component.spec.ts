import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMarketCompanyPageComponent } from './client-market-company-page.component';

describe('ClientMarketCompanyPageComponent', () => {
  let component: ClientMarketCompanyPageComponent;
  let fixture: ComponentFixture<ClientMarketCompanyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMarketCompanyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMarketCompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
