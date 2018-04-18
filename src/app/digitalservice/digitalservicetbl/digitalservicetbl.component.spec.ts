import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalservicetblComponent } from './digitalservicetbl.component';

describe('DigitalservicetblComponent', () => {
  let component: DigitalservicetblComponent;
  let fixture: ComponentFixture<DigitalservicetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalservicetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalservicetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
