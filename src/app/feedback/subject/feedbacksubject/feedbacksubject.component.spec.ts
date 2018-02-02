import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksubjectComponent } from './feedbacksubject.component';

describe('FeedbacksubjectComponent', () => {
  let component: FeedbacksubjectComponent;
  let fixture: ComponentFixture<FeedbacksubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbacksubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacksubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
