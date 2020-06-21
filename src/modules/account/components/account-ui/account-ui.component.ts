import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { AccountService } from '../../services/AccountService';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account-ui',
  templateUrl: './account-ui.component.html',
  styleUrls: ['./account-ui.component.less']
})
export class AccountUiComponent implements OnInit {

  constructor(private accountService: AccountService, @Inject('environment') private environment) { }

  ngOnInit(): void {
  }

  screen = this.accountService.screen;
  loginError = this.accountService.loginError;
  loading = this.accountService.loading;

  header = this.screen.pipe(map(screen => screen === 'login' ? 'Login' : 'Register'));

  navigate = () => {
    window.location.href = this.environment.sso;
  };

}
