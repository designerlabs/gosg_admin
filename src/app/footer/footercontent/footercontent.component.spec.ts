import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercontentComponent } from './footercontent.component';

describe('FootercontentComponent', () => {
  let component: FootercontentComponent;
  let fixture: ComponentFixture<FootercontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootercontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootercontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
