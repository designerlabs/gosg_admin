import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeeventComponent } from './lifeevent.component';

describe('LifeeventComponent', () => {
  let component: LifeeventComponent;
  let fixture: ComponentFixture<LifeeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
