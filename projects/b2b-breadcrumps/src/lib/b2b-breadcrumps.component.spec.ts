import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bBreadcrumpsComponent } from './b2b-breadcrumps.component';

describe('B2bBreadcrumpsComponent', () => {
  let component: B2bBreadcrumpsComponent;
  let fixture: ComponentFixture<B2bBreadcrumpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ B2bBreadcrumpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(B2bBreadcrumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
