import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencytblComponent } from './agencytbl.component';

describe('AgencytblComponent', () => {
  let component: AgencytblComponent;
  let fixture: ComponentFixture<AgencytblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencytblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencytblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
