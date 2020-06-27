import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppNotificationService } from '../../services/AppNotificationService';
import { DashboardUiService } from '../../services/DashboardUiService';
import _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { ifMobile } from '../../utils';

@Component({
  selector: 'app-dashboard-ui',
  templateUrl: './dashboard-ui.component.html',
  styleUrls: ['./dashboard-ui.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardUiComponent implements OnInit {

  constructor(
    private notificationService: AppNotificationService,
    private dashboardUiService: DashboardUiService
  ) { }

  ngOnInit(): void {
    this.notificationService.initialize();

    ifMobile(this.dashboardUiService.toggleSideMenu);
  };

  isMobileView = new BehaviorSubject<boolean>(false);

  sideMenuOpen = this.dashboardUiService.sideMenuOpen;
}
