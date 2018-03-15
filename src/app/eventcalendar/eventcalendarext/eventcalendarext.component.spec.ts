import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcalendarextComponent } from './eventcalendarext.component';

describe('EventcalendarextComponent', () => {
  let component: EventcalendarextComponent;
  let fixture: ComponentFixture<EventcalendarextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventcalendarextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventcalendarextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
