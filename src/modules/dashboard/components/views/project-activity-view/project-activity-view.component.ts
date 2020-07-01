import { Component, OnInit } from '@angular/core';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';

@Component({
  selector: 'app-project-activity-view',
  templateUrl: './project-activity-view.component.html',
  styleUrls: ['./project-activity-view.component.less']
})
export class ProjectActivityViewComponent implements OnInit {

  constructor(
    private dashboardUiService: DashboardUiService
  ) { }

  ngOnInit(): void {
    this.dashboardUiService.setProjectUiTab('activity');
  }

}
