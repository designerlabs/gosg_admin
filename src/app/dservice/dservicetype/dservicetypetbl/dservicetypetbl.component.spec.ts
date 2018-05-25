import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DServicetypetblComponent } from './dservicetypetbl.component';

describe('DServicetypetblComponent', () => {
  let component: DServicetypetblComponent;
  let fixture: ComponentFixture<DServicetypetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DServicetypetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DServicetypetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
