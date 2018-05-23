import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DServicetblComponent } from './dservicetbl.component';

describe('DigitalservicetblComponent', () => {
  let component: DServicetblComponent;
  let fixture: ComponentFixture<DServicetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DServicetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DServicetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
