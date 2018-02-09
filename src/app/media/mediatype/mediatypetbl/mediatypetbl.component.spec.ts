import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediatypetblComponent } from './mediatypetbl.component';

describe('MediatypetblComponent', () => {
  let component: MediatypetblComponent;
  let fixture: ComponentFixture<MediatypetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediatypetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediatypetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
