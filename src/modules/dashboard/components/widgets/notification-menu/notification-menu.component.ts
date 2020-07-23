import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AppNotificationService } from 'src/modules/dashboard/services/AppNotificationService';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';
import { take, map, reduce } from 'rxjs/operators';
import _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.less']
})
export class NotificationMenuComponent implements OnInit {

  @ViewChild('notificationbtn') notificationButton: ElementRef;
  @ViewChild('notificationmenu') notificationMenu: ElementRef;

  constructor(
    private notificationService: AppNotificationService,
    private dashboardUiService: DashboardUiService,
    private renderer: Renderer2
  ) { }

  public scrollClass = new BehaviorSubject<string>('scroll-hidden');

  notifications = this.notificationService.notifications.pipe(map(notifications => notifications.sort((a, b) => b.id - a.id)));
  notificationCount = this.notificationService.unseenCount;
  notificationsOpen = this.dashboardUiService.notificationsOpen;

  toggleNotifications = () => {
    this.dashboardUiService.toggleNotifications();
    this.notificationService.markAllAsSeen();
  }

  ngOnInit(): void {
    this.renderer.listen('window', 'mousemove', (e: Event) => {
      if (_.has(this.notificationMenu, 'nativeElement')) {
        const newValue = this.notificationMenu.nativeElement.contains(e.target) ? 'scroll-showing' : 'scroll-hidden';
        if (newValue !== this.scrollClass.value) {
          this.scrollClass.next(newValue);
        }
      }
    });

    this.scrollClass.subscribe(s => console.log(s));
  }

}
