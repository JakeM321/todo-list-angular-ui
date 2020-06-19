import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/modules/login/services/LoginService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {

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
  }

  @Input() loading: Observable<boolean>;

  onSubmit = () => {
    if (this.form.valid) {
      this.loginService.login({
        email: this.form.get('email').value,
        password: this.form.get('password').value
      });

      this.form.reset();
    }
  }

  form = new FormGroup({
    email:  new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  register = () => this.loginService.navigate('register');
}
