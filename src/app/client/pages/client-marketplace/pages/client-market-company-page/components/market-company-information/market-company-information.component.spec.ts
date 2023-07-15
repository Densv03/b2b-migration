import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCompanyInformationComponent } from './market-company-information.component';

describe('MarketCompanyInformationComponent', () => {
  let component: MarketCompanyInformationComponent;
  let fixture: ComponentFixture<MarketCompanyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketCompanyInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketCompanyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
