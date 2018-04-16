import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentpublishertblComponent } from './contentpublishertbl.component';

describe('ContentpublishertblComponent', () => {
  let component: ContentpublishertblComponent;
  let fixture: ComponentFixture<ContentpublishertblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentpublishertblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentpublishertblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
