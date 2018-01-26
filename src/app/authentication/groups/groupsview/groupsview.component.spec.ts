import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsviewComponent } from './groupsview.component';

describe('GroupsviewComponent', () => {
  let component: GroupsviewComponent;
  let fixture: ComponentFixture<GroupsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
