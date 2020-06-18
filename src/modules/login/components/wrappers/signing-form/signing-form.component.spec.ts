import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigningFormComponent } from './signing-form.component';

describe('SigningFormComponent', () => {
  let component: SigningFormComponent;
  let fixture: ComponentFixture<SigningFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigningFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
