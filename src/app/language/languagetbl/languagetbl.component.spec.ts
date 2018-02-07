import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagetblComponent } from './languagetbl.component';

describe('LanguagetblComponent', () => {
  let component: LanguagetblComponent;
  let fixture: ComponentFixture<LanguagetblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagetblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
