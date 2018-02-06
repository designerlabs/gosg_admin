import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthnicitytblComponent } from './ethnicitytbl.component';

describe('EthnicitytblComponent', () => {
  let component: EthnicitytblComponent;
  let fixture: ComponentFixture<EthnicitytblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthnicitytblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthnicitytblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
