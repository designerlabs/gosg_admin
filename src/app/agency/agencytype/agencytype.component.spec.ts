import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencytypeComponent } from './agencytype.component';

describe('AgencytypeComponent', () => {
  let component: AgencytypeComponent;
  let fixture: ComponentFixture<AgencytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
