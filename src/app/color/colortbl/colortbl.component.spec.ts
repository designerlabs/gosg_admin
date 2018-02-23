import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColortblComponent } from './colortbl.component';

describe('ColortblComponent', () => {
  let component: ColortblComponent;
  let fixture: ComponentFixture<ColortblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColortblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColortblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
