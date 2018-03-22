import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxsentComponent } from './inboxsent.component';

describe('InboxsentComponent', () => {
  let component: InboxsentComponent;
  let fixture: ComponentFixture<InboxsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
