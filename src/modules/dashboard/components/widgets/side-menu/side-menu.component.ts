import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.less']
})
export class SideMenuComponent implements OnInit {

  constructor(
    private dashboardUiService: DashboardUiService
  ) { }

  ngOnInit(): void {
  }

  open = this.dashboardUiService.sideMenuOpen;
  toggle = this.dashboardUiService.toggleSideMenu;

  menuLinks = of([{
    label: 'Dashboard',
    link: '',
    icon: ['fas', 'home'],
    active: true
  }, {
    label: 'My Tasks',
    link: '',
    icon: ['fas', 'tasks'],
    active: false
  }, {
    label: 'Projects',
    link: '',
    icon: ['fas', 'chalkboard'],
    active: false
  }, {
    label: 'Notifications',
    link: '',
    icon: ['fas', 'bell'],
    active: false
  }]);

  favourites = of([])

}
