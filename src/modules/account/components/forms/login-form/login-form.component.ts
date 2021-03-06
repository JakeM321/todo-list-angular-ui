import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/modules/account/services/AccountService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.loading.subscribe(loading => {
      if (loading) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }

  @Input() loading: Observable<boolean>;

  onSubmit = () => {
    if (this.form.valid) {
      this.accountService.login({
        email: this.form.get('email').value,
        password: this.form.get('password').value
      });
    }
  }

  form = new FormGroup({
    email:  new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  register = () => this.accountService.navigate('register');
}
