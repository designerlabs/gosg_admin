import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerytblComponent } from './gallerytbl.component';

describe('GallerytblComponent', () => {
  let component: GallerytblComponent;
  let fixture: ComponentFixture<GallerytblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerytblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerytblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
