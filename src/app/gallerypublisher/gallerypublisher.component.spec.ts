import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerypublisherComponent } from './gallerypublisher.component';

describe('GallerypublisherComponent', () => {
  let component: GallerypublisherComponent;
  let fixture: ComponentFixture<GallerypublisherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerypublisherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerypublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
