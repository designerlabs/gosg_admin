import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcalendartblComponent } from './eventcalendartbl.component';

describe('EventcalendartblComponent', () => {
  let component: EventcalendartblComponent;
  let fixture: ComponentFixture<EventcalendartblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventcalendartblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventcalendartblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
