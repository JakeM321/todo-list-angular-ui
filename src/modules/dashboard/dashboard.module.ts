import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardUiComponent } from './components/dashboard-ui/dashboard-ui.component';
import { AppNotificationService } from './services/AppNotificationService';
import { AnchorWindowComponent } from './components/elements/anchor-window/anchor-window.component';
import { DashboardUiService } from './services/DashboardUiService';
import { NavbarComponent } from './components/widgets/navbar/navbar.component';
import { NotificationMenuComponent } from './components/widgets/notification-menu/notification-menu.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faBars, faHome, faTasks, faChalkboard, faPlus, faStar as solidStar, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { UserMenuComponent } from './components/widgets/user-menu/user-menu.component';
import { SideMenuComponent } from './components/widgets/side-menu/side-menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainViewComponent } from './components/views/main-view/main-view.component';
import { ProjectListComponent } from './components/widgets/project-list/project-list.component';
import { ProjectViewComponent } from './components/views/project-view/project-view.component';
import { LoadingSpinnerComponent } from './components/elements/loading-spinner/loading-spinner.component';
import { NewProjectModalComponent } from './components/widgets/new-project-modal/new-project-modal.component';
import { ColorTwitterModule } from 'ngx-color/twitter'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardUiComponent, AnchorWindowComponent, NavbarComponent, NotificationMenuComponent, UserMenuComponent, SideMenuComponent, MainViewComponent, ProjectListComponent, ProjectViewComponent, LoadingSpinnerComponent, NewProjectModalComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DashboardRoutingModule,
    ColorTwitterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ AppNotificationService ],
  exports: [ DashboardUiComponent ]
})
export class DashboardModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faBell, faBars, faHome, faTasks, faChalkboard, faPlus, solidStar, regularStar as any, faSpinner);
  }
}