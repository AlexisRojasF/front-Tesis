import { ComponentFixture, TestBed } from '@angular/core/testing';

import { reportesComponent5 } from './reportes.component';

describe('reportesComponent', () => {
  let component: reportesComponent5;
  let fixture: ComponentFixture<reportesComponent5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ reportesComponent5 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(reportesComponent5);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
