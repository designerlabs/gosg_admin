import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalservicedetailsComponent } from './digitalservicedetails.component';

describe('DigitalserviceitemComponent', () => {
  let component: DigitalservicedetailsComponent;
  let fixture: ComponentFixture<DigitalservicedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalservicedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalservicedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
