import { ComponentFixture, TestBed } from '@angular/core/testing';

import { usuariosComponent2 } from './usuarios.component';

describe('usuariosComponent2', () => {
  let component: usuariosComponent2;
  let fixture: ComponentFixture<usuariosComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ usuariosComponent2 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(usuariosComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
