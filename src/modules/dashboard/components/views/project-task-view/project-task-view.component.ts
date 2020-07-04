import { Component, OnInit } from '@angular/core';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { ProjectTask, ProjectTaskIdentity } from 'src/modules/server/Types';
import { ProjectService } from 'src/modules/dashboard/services/ProjectService';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-task-view',
  templateUrl: './project-task-view.component.html',
  styleUrls: ['./project-task-view.component.less']
})
export class ProjectTaskViewComponent implements OnInit {

  constructor(
    private dashboardUiService: DashboardUiService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.dashboardUiService.setProjectUiTab('tasks');
  }

  tasks = this.projectService.selected.pipe(map(project => project.tasks));

  markComplete = (task: ProjectTaskIdentity) => this.projectService.markTaskCompletion(false, task);

  edit = () => {};

  newTask = () => this.dashboardUiService.toggleNewTaskMenu();

}
