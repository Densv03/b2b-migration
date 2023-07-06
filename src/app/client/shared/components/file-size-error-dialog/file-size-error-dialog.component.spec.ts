import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSizeErrorDialogComponent } from './file-size-error-dialog.component';

describe('FileSizeErrorDialogComponent', () => {
  let component: FileSizeErrorDialogComponent;
  let fixture: ComponentFixture<FileSizeErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSizeErrorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSizeErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
