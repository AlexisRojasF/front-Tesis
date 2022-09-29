import { ComponentFixture, TestBed } from '@angular/core/testing';

import { gruposComponent3 } from './grupos.component';

describe('gruposComponent', () => {
  let component: gruposComponent3;
  let fixture: ComponentFixture<gruposComponent3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ gruposComponent3 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(gruposComponent3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
