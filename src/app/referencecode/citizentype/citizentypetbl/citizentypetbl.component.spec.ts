import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizentypetblComponent } from './citizentypetbl.component';

describe('CitizentypetblComponent', () => {
  let component: CitizentypetblComponent;
  let fixture: ComponentFixture<CitizentypetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizentypetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizentypetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
