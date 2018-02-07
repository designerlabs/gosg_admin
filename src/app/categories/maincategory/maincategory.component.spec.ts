import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincategoryComponent } from './maincategory.component';

describe('MaincategoryComponent', () => {
  let component: MaincategoryComponent;
  let fixture: ComponentFixture<MaincategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaincategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaincategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
