import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercategoryComponent } from './footercategory.component';

describe('FootercategoryComponent', () => {
  let component: FootercategoryComponent;
  let fixture: ComponentFixture<FootercategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootercategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootercategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
