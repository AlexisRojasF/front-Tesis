import { ComponentFixture, TestBed } from '@angular/core/testing';

import { profeComponent } from './profe.component';

describe('profeComponent', () => {
  let component: profeComponent;
  let fixture: ComponentFixture<profeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ profeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(profeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
