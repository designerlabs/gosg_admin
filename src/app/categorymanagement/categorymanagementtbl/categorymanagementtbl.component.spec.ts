import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorymanagementtblComponent } from './categorymanagementtbl.component';

describe('CategorymanagementtblComponent', () => {
  let component: CategorymanagementtblComponent;
  let fixture: ComponentFixture<CategorymanagementtblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorymanagementtblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorymanagementtblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
