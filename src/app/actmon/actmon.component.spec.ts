import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActmonComponent } from './actmon.component';

describe('ActmonComponent', () => {
  let component: ActmonComponent;
  let fixture: ComponentFixture<ActmonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActmonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
