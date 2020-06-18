import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from 'src/modules/login/services/LoginService';

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
  }

  @Input() error: Observable<boolean>;
  @Output() submit = new EventEmitter<{email: string, password: string}>();

  onSubmit = () => {
    if (this.form.valid) {
      this.submit.emit({
        email: this.form.get('email').value,
        password: this.form.get('password').value
      });

      this.form.reset();
    }
  }

  form = new FormGroup({
    email:  new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  register = () => this.loginService.navigate('register');
}
