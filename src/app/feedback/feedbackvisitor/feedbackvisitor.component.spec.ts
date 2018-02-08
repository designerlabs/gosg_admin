import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackvisitorComponent } from './feedbackvisitor.component';

describe('FeedbackvisitorComponent', () => {
  let component: FeedbackvisitorComponent;
  let fixture: ComponentFixture<FeedbackvisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackvisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackvisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
