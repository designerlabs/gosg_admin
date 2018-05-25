import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DServicedetailstblComponent } from './dservicedetailstbl.component';

describe('DigitalservicedetailstblComponent', () => {
  let component: DServicedetailstblComponent;
  let fixture: ComponentFixture<DServicedetailstblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DServicedetailstblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DServicedetailstblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
