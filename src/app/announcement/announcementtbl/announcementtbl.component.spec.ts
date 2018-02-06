import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementtblComponent } from './announcementtbl.component';

describe('AnnouncementtblComponent', () => {
  let component: AnnouncementtblComponent;
  let fixture: ComponentFixture<AnnouncementtblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementtblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementtblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
