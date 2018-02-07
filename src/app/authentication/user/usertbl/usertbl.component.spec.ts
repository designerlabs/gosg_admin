import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertblComponent } from './usertbl.component';

describe('UsertblComponent', () => {
  let component: UsertblComponent;
  let fixture: ComponentFixture<UsertblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
