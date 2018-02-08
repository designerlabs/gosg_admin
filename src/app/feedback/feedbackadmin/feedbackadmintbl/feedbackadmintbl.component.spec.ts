import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackadmintblComponent } from './feedbackadmintbl.component';

describe('FeedbackadmintblComponent', () => {
  let component: FeedbackadmintblComponent;
  let fixture: ComponentFixture<FeedbackadmintblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackadmintblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackadmintblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
