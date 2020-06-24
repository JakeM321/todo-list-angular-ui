import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorWindowComponent } from './anchor-window.component';

describe('AnchorWindowComponent', () => {
  let component: AnchorWindowComponent;
  let fixture: ComponentFixture<AnchorWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnchorWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
