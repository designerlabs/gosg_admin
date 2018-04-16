import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentpublisherComponent } from './contentpublisher.component';

describe('ContentpublisherComponent', () => {
  let component: ContentpublisherComponent;
  let fixture: ComponentFixture<ContentpublisherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentpublisherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentpublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
