import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtlinksComponent } from './extlinks.component';

describe('ExtlinksComponent', () => {
  let component: ExtlinksComponent;
  let fixture: ComponentFixture<ExtlinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtlinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
