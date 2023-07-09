import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactCardComponent } from './company-contact-card.component';

describe('CompanyContactCardComponent', () => {
  let component: CompanyContactCardComponent;
  let fixture: ComponentFixture<CompanyContactCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyContactCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyContactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
