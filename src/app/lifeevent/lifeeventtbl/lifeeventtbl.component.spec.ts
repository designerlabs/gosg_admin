import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeeventtblComponent } from './lifeeventtbl.component';

describe('LifeeventtblComponent', () => {
  let component: LifeeventtblComponent;
  let fixture: ComponentFixture<LifeeventtblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeeventtblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeeventtblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
