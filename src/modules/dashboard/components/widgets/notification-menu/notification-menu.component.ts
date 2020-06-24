import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppNotificationService } from 'src/modules/dashboard/services/AppNotificationService';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.less']
})
export class NotificationMenuComponent implements OnInit {

  @ViewChild('notificationbtn') notificationButton: ElementRef;

  constructor(
    private notificationService: AppNotificationService,
    private dashboardUiService: DashboardUiService
  ) { }

  notifications = this.notificationService.notifications;
  notificationCount = this.notificationService.unseenCount;
  notificationsOpen = this.dashboardUiService.notificationsOpen;
  toggleNotifications = () => {
    this.dashboardUiService.toggleNotifications();
    this.notificationService.markAllAsSeen();
  }

  ngOnInit(){

  }

}
