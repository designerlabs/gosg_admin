import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersunregisterComponent } from './usersunregister.component';

describe('UsersunregisterComponent', () => {
  let component: UsersunregisterComponent;
  let fixture: ComponentFixture<UsersunregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersunregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersunregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
