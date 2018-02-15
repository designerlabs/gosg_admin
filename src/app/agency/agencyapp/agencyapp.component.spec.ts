import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyappComponent } from './agencyapp.component';

describe('AgencyappComponent', () => {
  let component: AgencyappComponent;
  let fixture: ComponentFixture<AgencyappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
