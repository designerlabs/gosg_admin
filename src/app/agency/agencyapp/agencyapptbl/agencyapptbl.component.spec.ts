import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyapptblComponent } from './agencyapptbl.component';

describe('AgencyapptblComponent', () => {
  let component: AgencyapptblComponent;
  let fixture: ComponentFixture<AgencyapptblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyapptblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyapptblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
