import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacktypetblComponent } from './feedbacktypetbl.component';

describe('FeedbacktypetblComponent', () => {
  let component: FeedbacktypetblComponent;
  let fixture: ComponentFixture<FeedbacktypetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbacktypetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacktypetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
