import { Component, OnInit } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import _ from 'lodash';
import { ifMobile } from 'src/modules/dashboard/utils';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.less']
})
export class SideMenuComponent implements OnInit {

  constructor(
    private dashboardUiService: DashboardUiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const urlChange = this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map(event => _.get(event, 'url', '')),
      map(url => url.replace('/dashboard', '.') )
    );

    urlChange.subscribe(url => this.menuLinks.next( this.menuLinks.value.map(item => ({ ...item, active: item.link === url })) ));
  }

  open = this.dashboardUiService.sideMenuOpen;
  toggle = this.dashboardUiService.toggleSideMenu;

  menuLinks = new BehaviorSubject([{
    label: 'Dashboard',
    link: '.',
    icon: ['fas', 'home']
  }, {
    label: 'My Tasks',
    link: './tasks',
    icon: ['fas', 'tasks']
  }, {
    label: 'Projects',
    link: './projects',
    icon: ['fas', 'chalkboard']
  }, {
    label: 'Notifications',
    link: './notifications',
    icon: ['fas', 'bell']
  }].map(item => ({ ...item, active: this.router.url.replace('/dashboard', '.') === item.link })));

  favourites = of([])

  useLink = () => {
    ifMobile(this.dashboardUiService.toggleSideMenu);
  }
}
