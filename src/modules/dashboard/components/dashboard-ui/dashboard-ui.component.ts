import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { AppNotificationService } from '../../services/AppNotificationService';
import { DashboardUiService } from '../../services/DashboardUiService';

@Component({
  selector: 'app-dashboard-ui',
  templateUrl: './dashboard-ui.component.html',
  styleUrls: ['./dashboard-ui.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardUiComponent implements OnInit {

  constructor(
    private notificationService: AppNotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.initialize();
  }
}
