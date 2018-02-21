import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModmenuComponent } from './modmenu.component';

describe('ModmenuComponent', () => {
  let component: ModmenuComponent;
  let fixture: ComponentFixture<ModmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
