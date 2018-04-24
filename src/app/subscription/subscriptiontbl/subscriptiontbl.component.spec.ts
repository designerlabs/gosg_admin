import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptiontblComponent } from './subscriptiontbl.component';

describe('SubscriptiontblComponent', () => {
  let component: SubscriptiontblComponent;
  let fixture: ComponentFixture<SubscriptiontblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptiontblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptiontblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
