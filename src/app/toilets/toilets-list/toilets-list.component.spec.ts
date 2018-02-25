import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletsListComponent } from './toilets-list.component';

describe('ToiletsListComponent', () => {
  let component: ToiletsListComponent;
  let fixture: ComponentFixture<ToiletsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToiletsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToiletsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
