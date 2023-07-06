import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PidorComponent } from './pidor.component';

describe('PidorComponent', () => {
  let component: PidorComponent;
  let fixture: ComponentFixture<PidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PidorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
