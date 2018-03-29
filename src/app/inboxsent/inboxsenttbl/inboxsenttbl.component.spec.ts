import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxsenttblComponent } from './inboxsenttbl.component';

describe('InboxsenttblComponent', () => {
  let component: InboxsenttblComponent;
  let fixture: ComponentFixture<InboxsenttblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxsenttblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxsenttblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
