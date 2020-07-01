import { Component, OnInit } from '@angular/core';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';

@Component({
  selector: 'app-project-members-view',
  templateUrl: './project-members-view.component.html',
  styleUrls: ['./project-members-view.component.less']
})
export class ProjectMembersViewComponent implements OnInit {

  constructor(
    private dashboardUiService: DashboardUiService
  ) { }

  ngOnInit(): void {
    this.dashboardUiService.setProjectUiTab('members');
  }

}
