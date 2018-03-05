import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailstblComponent } from './userdetailstbl.component';

describe('UserdetailstblComponent', () => {
  let component: UserdetailstblComponent;
  let fixture: ComponentFixture<UserdetailstblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdetailstblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdetailstblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
