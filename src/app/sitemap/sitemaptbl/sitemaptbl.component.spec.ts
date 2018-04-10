import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemaptblComponent } from './sitemaptbl.component';

describe('SitemaptblComponent', () => {
  let component: SitemaptblComponent;
  let fixture: ComponentFixture<SitemaptblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemaptblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemaptblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
