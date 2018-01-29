import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacktypeComponent } from './feedbacktype.component';

describe('FeedbacktypeComponent', () => {
  let component: FeedbacktypeComponent;
  let fixture: ComponentFixture<FeedbacktypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbacktypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacktypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
