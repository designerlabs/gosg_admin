import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalservicedetailstblComponent } from './digitalservicedetailstbl.component';

describe('DigitalservicedetailstblComponent', () => {
  let component: DigitalservicedetailstblComponent;
  let fixture: ComponentFixture<DigitalservicedetailstblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalservicedetailstblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalservicedetailstblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
