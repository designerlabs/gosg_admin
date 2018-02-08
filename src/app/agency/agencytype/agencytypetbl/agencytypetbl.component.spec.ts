import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencytypetblComponent } from './agencytypetbl.component';

describe('AgencytypetblComponent', () => {
  let component: AgencytypetblComponent;
  let fixture: ComponentFixture<AgencytypetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencytypetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencytypetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
