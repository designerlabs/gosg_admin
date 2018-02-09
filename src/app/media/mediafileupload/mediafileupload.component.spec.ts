import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediafileuploadComponent } from './mediafileupload.component';

describe('MediafileuploadComponent', () => {
  let component: MediafileuploadComponent;
  let fixture: ComponentFixture<MediafileuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediafileuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediafileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
