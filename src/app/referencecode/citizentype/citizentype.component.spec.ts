import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizentypeComponent } from './citizentype.component';

describe('CitizentypeComponent', () => {
  let component: CitizentypeComponent;
  let fixture: ComponentFixture<CitizentypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizentypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizentypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
