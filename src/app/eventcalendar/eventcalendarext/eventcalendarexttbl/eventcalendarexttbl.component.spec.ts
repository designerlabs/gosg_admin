import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcalendarexttblComponent } from './eventcalendarexttbl.component';

describe('EventcalendarexttblComponent', () => {
  let component: EventcalendarexttblComponent;
  let fixture: ComponentFixture<EventcalendarexttblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventcalendarexttblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventcalendarexttblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
