import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidertblComponent } from './slidertbl.component';

describe('SlidertblComponent', () => {
  let component: SlidertblComponent;
  let fixture: ComponentFixture<SlidertblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidertblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidertblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
