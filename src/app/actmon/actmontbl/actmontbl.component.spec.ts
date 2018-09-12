import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActmontblComponent } from './actmontbl.component';

describe('ActmontblComponent', () => {
  let component: ActmontblComponent;
  let fixture: ComponentFixture<ActmontblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActmontblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActmontblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
