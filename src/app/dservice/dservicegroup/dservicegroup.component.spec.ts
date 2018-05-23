import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DServicegroupComponent } from './dservicegroup.component';

describe('DServicegroupComponent', () => {
  let component: DServicegroupComponent;
  let fixture: ComponentFixture<DServicegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DServicegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DServicegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
