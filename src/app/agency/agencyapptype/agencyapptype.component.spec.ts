import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyapptypeComponent } from './agencyapptype.component';

describe('AgencyapptypeComponent', () => {
  let component: AgencyapptypeComponent;
  let fixture: ComponentFixture<AgencyapptypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyapptypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyapptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
