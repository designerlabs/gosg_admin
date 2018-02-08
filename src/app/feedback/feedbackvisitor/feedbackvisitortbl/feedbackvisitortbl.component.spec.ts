import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackvisitortblComponent } from './feedbackvisitortbl.component';

describe('FeedbackvisitortblComponent', () => {
  let component: FeedbackvisitortblComponent;
  let fixture: ComponentFixture<FeedbackvisitortblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackvisitortblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackvisitortblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
