import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FonttblComponent } from './fonttbl.component';

describe('FonttblComponent', () => {
  let component: FonttblComponent;
  let fixture: ComponentFixture<FonttblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FonttblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FonttblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
