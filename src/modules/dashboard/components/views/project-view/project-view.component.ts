import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/modules/dashboard/services/ProjectService';
import { ActivatedRoute, Route } from '@angular/router';
import { map } from 'rxjs/operators';
import _ from 'lodash';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.less']
})
export class ProjectViewComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private dashboardUiService: DashboardUiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(newParams => this.projectService.openProject(newParams.get('id')));
  }

  selected = this.projectService.selected;
  tab = this.dashboardUiService.projectUiTab;

}
