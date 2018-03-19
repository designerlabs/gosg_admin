import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishertblComponent } from './publishertbl.component';

describe('PublishertblComponent', () => {
  let component: PublishertblComponent;
  let fixture: ComponentFixture<PublishertblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishertblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishertblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
