import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationtypeComponent } from './identificationtype.component';

describe('IdentificationtypeComponent', () => {
  let component: IdentificationtypeComponent;
  let fixture: ComponentFixture<IdentificationtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificationtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
