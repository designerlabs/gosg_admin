import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrytblComponent } from './countrytbl.component';

describe('CountrytblComponent', () => {
  let component: CountrytblComponent;
  let fixture: ComponentFixture<CountrytblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrytblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrytblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
