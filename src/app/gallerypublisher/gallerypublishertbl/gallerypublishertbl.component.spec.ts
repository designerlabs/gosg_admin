import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerypublishertblComponent } from './gallerypublishertbl.component';

describe('GallerypublishertblComponent', () => {
  let component: GallerypublishertblComponent;
  let fixture: ComponentFixture<GallerypublishertblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerypublishertblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerypublishertblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
