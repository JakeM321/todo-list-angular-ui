import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardUiComponent } from './components/dashboard-ui/dashboard-ui.component';
import { AppNotificationService } from './services/AppNotificationService';
import { AnchorWindowComponent } from './components/elements/anchor-window/anchor-window.component';
import { DashboardUiService } from './services/DashboardUiService';
import { NavbarComponent } from './components/widgets/navbar/navbar.component';
import { NotificationMenuComponent } from './components/widgets/notification-menu/notification-menu.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faBars, faHome, faTasks, faChalkboard, faPlus, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { UserMenuComponent } from './components/widgets/user-menu/user-menu.component';
import { SideMenuComponent } from './components/widgets/side-menu/side-menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainViewComponent } from './components/views/main-view/main-view.component';
import { ProjectListComponent } from './components/widgets/project-list/project-list.component';



@NgModule({
  declarations: [DashboardUiComponent, AnchorWindowComponent, NavbarComponent, NotificationMenuComponent, UserMenuComponent, SideMenuComponent, MainViewComponent, ProjectListComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DashboardRoutingModule
  ],
  providers: [ AppNotificationService, DashboardUiService ],
  exports: [ DashboardUiComponent ]
})
export class DashboardModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faBell, faBars, faHome, faTasks, faChalkboard, faPlus, solidStar, regularStar as any);
  }
}