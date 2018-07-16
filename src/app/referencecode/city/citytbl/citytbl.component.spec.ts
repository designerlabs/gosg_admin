import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitytblComponent } from './citytbl.component';

describe('CitytblComponent', () => {
  let component: CitytblComponent;
  let fixture: ComponentFixture<CitytblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitytblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitytblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
