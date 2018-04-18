import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalserviceComponent } from './digitalservice.component';

describe('DigitalserviceComponent', () => {
  let component: DigitalserviceComponent;
  let fixture: ComponentFixture<DigitalserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
