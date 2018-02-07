import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountstatustblComponent } from './accountstatustbl.component';

describe('AccountstatustblComponent', () => {
  let component: AccountstatustblComponent;
  let fixture: ComponentFixture<AccountstatustblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountstatustblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountstatustblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
