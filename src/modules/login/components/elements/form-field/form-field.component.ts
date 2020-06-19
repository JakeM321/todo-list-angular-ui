import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, combineLatest } from 'rxjs/operators';
import _ from 'lodash';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.less']
})
export class FormFieldComponent implements OnInit {
  constructor(private controlContainer: ControlContainer) { }

  public form: FormGroup;
  public control : FormControl;
  
  @Input() type: string = 'text';
  @Input() label: string;
  @Input() controlName: string;
  @Input() hasLeftIcon: boolean = false;
  @Input() icon: any = [];

  @Input() errorMessages: { [key: string]: string } = {};
  public errorKeys: string[] = [];
  public hasErrors: Observable<boolean>;

  @Input() hasLiveValidation: boolean = false;
  @Input() isValidating: Observable<boolean> = of(false);
  @Input() liveValidationSucceeded: Observable<boolean> = of(false);

  public controlClass: string = '';
  public inputClass: Observable<string>;

  ngOnInit(): void {
    this.form = <FormGroup>this.controlContainer.control;
    this.control = <FormControl>this.form.get(this.controlName);
    this.errorKeys = Object.keys(this.errorMessages);

    this.hasErrors = this.form.valueChanges.pipe(map(() => {
      return this.errorKeys.some(key => this.checkError(key).hasError);
    }));

    if (this.hasLeftIcon) {
      this.controlClass += ' has-icons-left';
    }

    this.isValidating.subscribe(validating => {
      var newClass = '';
      if (validating) {
        newClass += 'is-loading';
      }
      if (this.hasLeftIcon) {
        newClass += ' has-icons-left';
      }

      this.controlClass = newClass;
    });

    this.inputClass = this.hasErrors.pipe(
      combineLatest(this.liveValidationSucceeded, ( hasErrors, validationSucceeded ) => {
        if ((hasErrors || this.control.invalid) && this.control.touched) {
          return 'is-danger';
        } else if (validationSucceeded) {
          return 'is-success';
        } else {
          return '';
        }
      })
    );
  }

  private checkField = (key: string): boolean => {
    return _.get(this.form.errors, `${this.controlName}`, false)
      || _.get(this.form.get(this.controlName), `errors.${ key }`, false); 
  }

  checkError = (key: string): { hasError: boolean, message: string } => ({
    hasError: this.checkField(key),
    message: this.errorMessages[key]
  });
}