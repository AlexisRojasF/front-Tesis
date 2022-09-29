import { ComponentFixture, TestBed } from '@angular/core/testing';

import { facultadesComponent4 } from './facultades.component';

describe('facultadesComponent4', () => {
  let component: facultadesComponent4;
  let fixture: ComponentFixture<facultadesComponent4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ facultadesComponent4 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(facultadesComponent4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
