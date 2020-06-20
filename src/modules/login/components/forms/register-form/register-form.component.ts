import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { LoginService } from 'src/modules/login/services/LoginService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import _ from 'lodash';

const mustMatch = (controlNames: string[]) => (formGroup: FormGroup) => {
  const controls = controlNames.map(name => formGroup.controls[name]);

  if (controls.some(control => control.errors && !control.errors['mustMatch'])) {
    return null;
  }
  else {
    const distinctValues = controls.reduce(
      (acc, next) => 
        Object.keys(acc).includes(next.value)
          ? acc
          : { ...acc, [next.value]: '' },
      {});
    
    if (Object.keys(distinctValues).length > 1) {
      console.log('matching error');
      return controlNames.reduce((acc, next) => ({ ...acc, [next]: { mustMatch: true } }), {});
    } else {
      return null;
    }
  }
};

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.pick(state => state.loading).subscribe(loading => {
      if (loading) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });

    const emailField = this.form.get('email');

    emailField.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      filter(value => ! _.isEmpty(value))
    ).subscribe(email => {
      if (! _.get(emailField.errors, 'email', false) ) {
        this.loginService.validateEmail(email).subscribe(available => {

          const remainingErrors = () => {
            if (_.has(emailField, 'errors.emailInUse')) {
              const { emailInUse, ...remaining } = emailField.errors;
              return remaining;
            } else {
              return emailField.errors;
            }
          };

          emailField.setErrors( available ? remainingErrors() : { emailInUse: true });
        });
      } else {
        this.loginService.resetEmailValidation();
      }
    })
  }

  @Input() loading: Observable<boolean>;

  onSubmit = () => {
    if (this.form.valid) {
      this.loginService.register({
        email: this.form.get('email').value,
        password: this.form.get('password').value,
        displayName: this.form.get('displayName').value
      });
    }
  };

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    displayName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, [
    mustMatch(['password', 'confirmPassword'])
  ]);

  login = () => this.loginService.navigate('login');

  emailValid = this.loginService.pick(state => state.emailValid);
  validatingEmail = this.loginService.pick(state => state.validatingEmail);
}
