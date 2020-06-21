import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashScreenWrapperComponent } from './splash-screen-wrapper.component';

describe('SplashScreenWrapperComponent', () => {
  let component: SplashScreenWrapperComponent;
  let fixture: ComponentFixture<SplashScreenWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashScreenWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashScreenWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
