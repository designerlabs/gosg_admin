import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderpublisherComponent } from './sliderpublisher.component';

describe('SliderpublisherComponent', () => {
  let component: SliderpublisherComponent;
  let fixture: ComponentFixture<SliderpublisherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderpublisherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderpublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
