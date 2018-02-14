import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercontenttblComponent } from './footercontenttbl.component';

describe('FootercontenttblComponent', () => {
  let component: FootercontenttblComponent;
  let fixture: ComponentFixture<FootercontenttblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootercontenttblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootercontenttblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
