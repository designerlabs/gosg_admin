import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollquestionComponent } from './pollquestion.component';

describe('PollquestionComponent', () => {
  let component: PollquestionComponent;
  let fixture: ComponentFixture<PollquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
