import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testComponent6 } from './test.component';

describe('testComponent6', () => {
  let component: testComponent6;
  let fixture: ComponentFixture<testComponent6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ testComponent6 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(testComponent6);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
