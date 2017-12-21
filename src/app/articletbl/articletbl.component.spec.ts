import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticletblComponent } from './articletbl.component';

describe('ArticletblComponent', () => {
  let component: ArticletblComponent;
  let fixture: ComponentFixture<ArticletblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticletblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticletblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
