import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollresultdetailComponent } from './pollresultdetail.component';

describe('PollresultdetailComponent', () => {
  let component: PollresultdetailComponent;
  let fixture: ComponentFixture<PollresultdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollresultdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollresultdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
