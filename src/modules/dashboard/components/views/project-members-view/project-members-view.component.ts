import { Component, OnInit } from '@angular/core';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';
import { ProjectService } from 'src/modules/dashboard/services/ProjectService';

@Component({
  selector: 'app-project-members-view',
  templateUrl: './project-members-view.component.html',
  styleUrls: ['./project-members-view.component.less']
})
export class ProjectMembersViewComponent implements OnInit {

  constructor(
    private dashboardUiService: DashboardUiService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.dashboardUiService.setProjectUiTab('members');
  }

  members = this.projectService.members;

  newMember = () => this.dashboardUiService.toggleAddMemberMenu();

}
