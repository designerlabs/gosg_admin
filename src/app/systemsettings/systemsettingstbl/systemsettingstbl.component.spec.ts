import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsettingstblComponent } from './systemsettingstbl.component';

describe('SystemsettingstblComponent', () => {
  let component: SystemsettingstblComponent;
  let fixture: ComponentFixture<SystemsettingstblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemsettingstblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsettingstblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
