import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.form = <FormGroup>this.controlContainer.control;
    this.control = <FormControl>this.form.get(this.controlName);
    this.errorKeys = Object.keys(this.errorMessages);

    this.hasErrors = this.form.valueChanges.pipe(map(() => {
      return this.errorKeys.some(key => this.checkError(key).hasError);
    }));
  }

  private checkField = (key: string): boolean => {
    if (this.form.errors == null) {
      return false
    } else {
      const keys = Object.keys(this.form.errors);
      if (!keys.includes(this.controlName)) {
        return false;
      } else {
        const errors = this.form.errors[this.controlName];
        if (errors == null) {
          return false;
        } else {
          if (!Object.keys(errors).includes(key) ) {
            return false;
          } else {
            return errors[key] === true;
          }
        }
      }
    }
  }

  checkError = (key: string): { hasError: boolean, message: string } => ({
    hasError: this.checkField(key),
    message: this.errorMessages[key]
  });
}