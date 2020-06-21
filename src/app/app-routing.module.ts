import { NgModule, Inject, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { DashboardUiComponent } from 'src/modules/dashboard/dashboard-ui/dashboard-ui.component';
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { map } from 'rxjs/operators';
import { ServerModule } from 'src/modules/server/server.module';
import { AccountUiComponent } from 'src/modules/account/components/account-ui/account-ui.component';

enum Mode {
  Login,
  Dashboard
};

class Guard implements CanActivate {
  protected mode: Mode;

  constructor(
    private authenticationService : IAuthenticationService,
    private router: Router
  ) {}

  canActivate = () => this.authenticationService.Status.pipe(map(status => {
    if (this.mode === Mode.Dashboard && !status.isAuthenticated) {
      return this.router.parseUrl('/');
    } else if (this.mode === Mode.Login && status.isAuthenticated) {
      return this.router.parseUrl('/dashboard')
    } else {
      return true;
    }
  } ));
};

@Injectable()
class LoginGuard extends Guard {
  mode = Mode.Login;
  constructor(
    @Inject('IAuthenticationService') authenticationService : IAuthenticationService,
    router: Router
  ) {
    super(authenticationService, router);
  }
}

@Injectable()
class DashboardGuard extends Guard {
  mode = Mode.Dashboard;
  constructor(
    @Inject('IAuthenticationService') authenticationService : IAuthenticationService,
    router: Router
  ) {
    super(authenticationService, router);
  }
}


const routes: Routes = [{
  path: '',
  component: AccountUiComponent,
  canActivate: [LoginGuard]

}, {
  path: 'dashboard',
  component: DashboardUiComponent,
  canActivate: [DashboardGuard]
}];

@NgModule({
  imports: [
    ServerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginGuard, DashboardGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
