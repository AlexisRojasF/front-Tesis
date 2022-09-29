import { ComponentFixture, TestBed } from '@angular/core/testing';

import { gruposComponent } from './grupos.component';

describe('gruposComponent', () => {
  let component: gruposComponent;
  let fixture: ComponentFixture<gruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ gruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(gruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
