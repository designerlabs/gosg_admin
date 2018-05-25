import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DServicetypeComponent } from './dservicetype.component';

describe('DServicetypeComponent', () => {
  let component: DServicetypeComponent;
  let fixture: ComponentFixture<DServicetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DServicetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DServicetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
