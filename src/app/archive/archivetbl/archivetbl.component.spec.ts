import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivetblComponent } from './archivetbl.component';

describe('ArchivetblComponent', () => {
  let component: ArchivetblComponent;
  let fixture: ComponentFixture<ArchivetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
