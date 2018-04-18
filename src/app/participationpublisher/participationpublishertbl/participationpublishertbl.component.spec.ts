import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationpublishertblComponent } from './participationpublishertbl.component';

describe('ParticipationpublishertblComponent', () => {
  let component: ParticipationpublishertblComponent;
  let fixture: ComponentFixture<ParticipationpublishertblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipationpublishertblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipationpublishertblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
