import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxListComponent } from './ngx-list.component';

describe('NgxListComponent', () => {
  let component: NgxListComponent;
  let fixture: ComponentFixture<NgxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
