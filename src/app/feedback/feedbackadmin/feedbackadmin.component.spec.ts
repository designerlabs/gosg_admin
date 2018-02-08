import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackadminComponent } from './feedbackadmin.component';

describe('FeedbackadminComponent', () => {
  let component: FeedbackadminComponent;
  let fixture: ComponentFixture<FeedbackadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
