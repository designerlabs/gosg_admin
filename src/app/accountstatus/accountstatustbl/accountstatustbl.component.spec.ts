import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingModule } from 'ngx-loading';
import { AccountstatustblComponent } from './accountstatustbl.component';

describe('AccountstatustblComponent', () => {
  let component: AccountstatustblComponent;
  let fixture: ComponentFixture<AccountstatustblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountstatustblComponent ],
      imports: [LoadingModule]
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
