import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrormessagetblComponent } from './errormessagetbl.component';

describe('ErrormessagetblComponent', () => {
  let component: ErrormessagetblComponent;
  let fixture: ComponentFixture<ErrormessagetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrormessagetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrormessagetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
