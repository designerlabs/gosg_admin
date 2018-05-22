import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulertblComponent } from './schedulertbl.component';

describe('SchedulertblComponent', () => {
  let component: SchedulertblComponent;
  let fixture: ComponentFixture<SchedulertblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulertblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulertblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
