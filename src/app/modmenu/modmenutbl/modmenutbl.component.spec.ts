import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModmenutblComponent } from './modmenutbl.component';

describe('ModmenutblComponent', () => {
  let component: ModmenutblComponent;
  let fixture: ComponentFixture<ModmenutblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModmenutblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModmenutblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
