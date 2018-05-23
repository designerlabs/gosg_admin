import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DServiceComponent } from './dservice.component';

describe('DServiceComponent', () => {
  let component: DServiceComponent;
  let fixture: ComponentFixture<DServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
