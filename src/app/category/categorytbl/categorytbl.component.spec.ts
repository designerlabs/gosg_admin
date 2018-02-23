import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorytblComponent } from './categorytbl.component';

describe('CategorytblComponent', () => {
  let component: CategorytblComponent;
  let fixture: ComponentFixture<CategorytblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorytblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorytblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
