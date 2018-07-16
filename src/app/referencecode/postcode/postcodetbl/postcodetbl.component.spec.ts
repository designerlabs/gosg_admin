import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcodetblComponent } from './postcodetbl.component';

describe('PostcodetblComponent', () => {
  let component: PostcodetblComponent;
  let fixture: ComponentFixture<PostcodetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostcodetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcodetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
