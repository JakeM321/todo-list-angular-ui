import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { AccountService } from '../../services/AccountService';
import { map } from 'rxjs/operators';
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';

@Component({
  selector: 'app-account-ui',
  templateUrl: './account-ui.component.html',
  styleUrls: ['./account-ui.component.less']
})
export class AccountUiComponent implements OnInit {

  constructor(private accountService: AccountService, @Inject('IAuthenticationService') private authService: IAuthenticationService) { }

  private ssoUrl: string = '';

  ngOnInit(): void {
    this.authService.SsoRedirectUrl().subscribe(url => this.ssoUrl = url);
  }

  screen = this.accountService.screen;
  loginError = this.accountService.loginError;
  loading = this.accountService.loading;

  header = this.screen.pipe(map(screen => screen === 'login' ? 'Login' : 'Register'));

  navigate = () => {
    console.log('SSO redirect', this.ssoUrl);
    window.location.href = this.ssoUrl;
  };

}
