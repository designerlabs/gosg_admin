import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationtblComponent } from './participationtbl.component';

describe('ParticipationtblComponent', () => {
  let component: ParticipationtblComponent;
  let fixture: ComponentFixture<ParticipationtblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipationtblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipationtblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
