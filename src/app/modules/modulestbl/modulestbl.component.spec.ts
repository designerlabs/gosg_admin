import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulestblComponent } from './modulestbl.component';

describe('ModulestblComponent', () => {
  let component: ModulestblComponent;
  let fixture: ComponentFixture<ModulestblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulestblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulestblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
