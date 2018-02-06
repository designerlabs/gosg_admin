import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqtblComponent } from './faqtbl.component';

describe('FaqtblComponent', () => {
  let component: FaqtblComponent;
  let fixture: ComponentFixture<FaqtblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqtblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqtblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
