import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderpublishertblComponent } from './sliderpublishertbl.component';

describe('SliderpublishertblComponent', () => {
  let component: SliderpublishertblComponent;
  let fixture: ComponentFixture<SliderpublishertblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderpublishertblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderpublishertblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
