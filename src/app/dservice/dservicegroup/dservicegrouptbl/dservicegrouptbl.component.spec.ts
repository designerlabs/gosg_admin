import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DServicegrouptblComponent } from './dservicegrouptbl.component';

describe('DServicegrouptblComponent', () => {
  let component: DServicegrouptblComponent;
  let fixture: ComponentFixture<DServicegrouptblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DServicegrouptblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DServicegrouptblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
