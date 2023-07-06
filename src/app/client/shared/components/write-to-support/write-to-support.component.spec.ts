import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteToSupportComponent } from './write-to-support.component';

describe('WriteToSupportComponent', () => {
  let component: WriteToSupportComponent;
  let fixture: ComponentFixture<WriteToSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteToSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteToSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
