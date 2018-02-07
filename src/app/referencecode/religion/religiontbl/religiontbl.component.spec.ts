import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligiontblComponent } from './religiontbl.component';

describe('ReligiontblComponent', () => {
  let component: ReligiontblComponent;
  let fixture: ComponentFixture<ReligiontblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligiontblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligiontblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
