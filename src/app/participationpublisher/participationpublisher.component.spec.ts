import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationpublisherComponent } from './participationpublisher.component';

describe('ParticipationpublisherComponent', () => {
  let component: ParticipationpublisherComponent;
  let fixture: ComponentFixture<ParticipationpublisherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipationpublisherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipationpublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
