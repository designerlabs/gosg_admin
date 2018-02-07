import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincategorytblComponent } from './maincategorytbl.component';

describe('MaincategorytblComponent', () => {
  let component: MaincategorytblComponent;
  let fixture: ComponentFixture<MaincategorytblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaincategorytblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaincategorytblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
