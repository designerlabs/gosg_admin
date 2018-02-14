import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtlinkstblComponent } from './extlinkstbl.component';

describe('ExtlinkstblComponent', () => {
  let component: ExtlinkstblComponent;
  let fixture: ComponentFixture<ExtlinkstblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtlinkstblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtlinkstblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
