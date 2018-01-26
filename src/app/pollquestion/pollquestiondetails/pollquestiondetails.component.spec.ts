import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollquestiondetailsComponent } from './pollquestiondetails.component';

describe('PollquestiondetailsComponent', () => {
  let component: PollquestiondetailsComponent;
  let fixture: ComponentFixture<PollquestiondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollquestiondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollquestiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
