import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountService } from '../../services/AccountService';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account-ui',
  templateUrl: './account-ui.component.html',
  styleUrls: ['./account-ui.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AccountUiComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  screen = this.accountService.screen;
  loginError = this.accountService.loginError;
  loading = this.accountService.pick(state => state.loading);

  header = this.screen.pipe(map(screen => screen === 'login' ? 'Login' : 'Register'));

}
