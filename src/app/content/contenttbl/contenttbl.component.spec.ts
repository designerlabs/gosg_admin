import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenttblComponent } from './contenttbl.component';

describe('ContenttblComponent', () => {
  let component: ContenttblComponent;
  let fixture: ComponentFixture<ContenttblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenttblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenttblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
