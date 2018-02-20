import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercategorytblComponent } from './footercategorytbl.component';

describe('FootercategorytblComponent', () => {
  let component: FootercategorytblComponent;
  let fixture: ComponentFixture<FootercategorytblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootercategorytblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootercategorytblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
