import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyapptypetblComponent } from './agencyapptypetbl.component';

describe('AgencyapptypetblComponent', () => {
  let component: AgencyapptypetblComponent;
  let fixture: ComponentFixture<AgencyapptypetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyapptypetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyapptypetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
