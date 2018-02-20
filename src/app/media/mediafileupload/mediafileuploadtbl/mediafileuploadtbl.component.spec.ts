import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediafileuploadtblComponent } from './mediafileuploadtbl.component';

describe('MediafileuploadtblComponent', () => {
  let component: MediafileuploadtblComponent;
  let fixture: ComponentFixture<MediafileuploadtblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediafileuploadtblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediafileuploadtblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
