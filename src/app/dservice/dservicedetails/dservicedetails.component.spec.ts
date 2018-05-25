import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DServicedetailsComponent } from './dservicedetails.component';

describe('DServicedetailsComponent', () => {
  let component: DServicedetailsComponent;
  let fixture: ComponentFixture<DServicedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DServicedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DServicedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
