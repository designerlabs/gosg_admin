import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxtblComponent } from './inboxtbl.component';

describe('InboxtblComponent', () => {
  let component: InboxtblComponent;
  let fixture: ComponentFixture<InboxtblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxtblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxtblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
