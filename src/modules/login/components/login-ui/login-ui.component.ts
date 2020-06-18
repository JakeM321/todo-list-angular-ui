import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { LoginService } from '../../services/LoginService';
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';

@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class LoginUiComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    
  ) { }

  ngOnInit(): void {
  }

  screen = this.loginService.screen;
  loginError = this.loginService.loginError;

  login = this.loginService.login;
  register = (payload: any) => { console.log('register', payload) };

  loading = this.loginService.pick(state => state.loading);
}
