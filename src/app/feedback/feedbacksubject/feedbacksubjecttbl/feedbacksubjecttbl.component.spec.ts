import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksubjecttblComponent } from './feedbacksubjecttbl.component';

describe('FeedbacksubjecttblComponent', () => {
  let component: FeedbacksubjecttblComponent;
  let fixture: ComponentFixture<FeedbacksubjecttblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbacksubjecttblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacksubjecttblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
