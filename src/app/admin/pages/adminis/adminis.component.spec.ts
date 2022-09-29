import { ComponentFixture, TestBed } from '@angular/core/testing';

import { adminisComponent1 } from './adminis.component';

describe('adminisComponent1', () => {
  let component: adminisComponent1;
  let fixture: ComponentFixture<adminisComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ adminisComponent1 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(adminisComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
