import { Component, OnInit, Inject } from '@angular/core';
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'todo-list-angular-ui';

  constructor(@Inject('IAuthenticationService') authenticationService : IAuthenticationService) {
    authenticationService.Initialize();
  }
}
