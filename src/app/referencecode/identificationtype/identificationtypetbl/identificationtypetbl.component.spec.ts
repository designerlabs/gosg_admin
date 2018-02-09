import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationtypetblComponent } from './identificationtypetbl.component';

describe('IdentificationtypetblComponent', () => {
  let component: IdentificationtypetblComponent;
  let fixture: ComponentFixture<IdentificationtypetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificationtypetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationtypetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
