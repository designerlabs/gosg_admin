import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorytblComponent } from './subcategorytbl.component';

describe('SubcategorytblComponent', () => {
  let component: SubcategorytblComponent;
  let fixture: ComponentFixture<SubcategorytblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategorytblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategorytblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
