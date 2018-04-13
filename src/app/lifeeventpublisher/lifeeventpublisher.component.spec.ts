import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeeventpublisherComponent } from './lifeeventpublisher.component';

describe('LifeeventpublisherComponent', () => {
  let component: LifeeventpublisherComponent;
  let fixture: ComponentFixture<LifeeventpublisherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeeventpublisherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeeventpublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
