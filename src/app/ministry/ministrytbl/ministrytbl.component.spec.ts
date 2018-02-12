import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistrytblComponent } from './ministrytbl.component';

describe('MinistrytblComponent', () => {
  let component: MinistrytblComponent;
  let fixture: ComponentFixture<MinistrytblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinistrytblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistrytblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
