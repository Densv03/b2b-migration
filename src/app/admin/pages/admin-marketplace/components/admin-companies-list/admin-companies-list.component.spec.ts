import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompaniesListComponent } from './admin-companies-list.component';

describe('AdminCompaniesListComponent', () => {
  let component: AdminCompaniesListComponent;
  let fixture: ComponentFixture<AdminCompaniesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCompaniesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompaniesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
