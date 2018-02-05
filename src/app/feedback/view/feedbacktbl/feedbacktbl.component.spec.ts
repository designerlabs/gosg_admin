import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacktblComponent } from './feedbacktbl.component';

describe('FeedbacktblComponent', () => {
  let component: FeedbacktblComponent;
  let fixture: ComponentFixture<FeedbacktblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbacktblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacktblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
