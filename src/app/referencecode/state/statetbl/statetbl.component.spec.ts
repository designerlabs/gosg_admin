import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatetblComponent } from './statetbl.component';

describe('StatetblComponent', () => {
  let component: StatetblComponent;
  let fixture: ComponentFixture<StatetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
