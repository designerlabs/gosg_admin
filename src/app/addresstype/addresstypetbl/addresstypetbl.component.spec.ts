import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresstypetblComponent } from './addresstypetbl.component';

describe('AddresstypetblComponent', () => {
  let component: AddresstypetblComponent;
  let fixture: ComponentFixture<AddresstypetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresstypetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresstypetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
