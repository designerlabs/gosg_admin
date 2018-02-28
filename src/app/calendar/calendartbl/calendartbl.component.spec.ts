import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendartblComponent } from './calendartbl.component';

describe('CalendartblComponent', () => {
  let component: CalendartblComponent;
  let fixture: ComponentFixture<CalendartblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendartblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendartblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
