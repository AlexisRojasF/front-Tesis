import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaeaComponent } from './chaea.component';

describe('ChaeaComponent', () => {
  let component: ChaeaComponent;
  let fixture: ComponentFixture<ChaeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaeaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
