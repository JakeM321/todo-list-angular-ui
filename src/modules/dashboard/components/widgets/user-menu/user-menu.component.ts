import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.less']
})
export class UserMenuComponent implements OnInit {

  @ViewChild('useravatar') userAvatar: ElementRef;

  constructor(
    private dashboardUiService: DashboardUiService,
    @Inject('IAuthenticationService') private authenticationService: IAuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggle = this.dashboardUiService.toggleUserMenu;
  menuOpen = this.dashboardUiService.userMenuOpen;

  initial = this.authenticationService.Status.pipe(map(status => status.displayName.length > 0 ? status.displayName[0]: ''));
  name = this.authenticationService.Status.pipe(map(status => status.displayName));

  logout = () => {
    console.log('logout');
    this.authenticationService.Logout();
    this.router.navigate(['/logout']);
  };

}
