import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightcontentComponent } from './rightcontent.component';

describe('RightcontentComponent', () => {
  let component: RightcontentComponent;
  let fixture: ComponentFixture<RightcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
