import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeeventpublishertblComponent } from './lifeeventpublishertbl.component';

describe('LifeeventpublishertblComponent', () => {
  let component: LifeeventpublishertblComponent;
  let fixture: ComponentFixture<LifeeventpublishertblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeeventpublishertblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeeventpublishertblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
