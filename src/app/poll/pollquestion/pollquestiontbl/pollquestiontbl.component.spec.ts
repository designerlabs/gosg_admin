import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollquestiontblComponent } from './pollquestiontbl.component';

describe('PollquestiontblComponent', () => {
  let component: PollquestiontblComponent;
  let fixture: ComponentFixture<PollquestiontblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollquestiontblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollquestiontblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
