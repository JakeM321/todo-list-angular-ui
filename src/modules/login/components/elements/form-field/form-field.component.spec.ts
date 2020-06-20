import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldComponent } from './form-field.component';
import { ReactiveFormsModule, ControlContainer, FormGroup } from '@angular/forms';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO - find a way to inject parent form

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
