import { Component, OnInit } from '@angular/core';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from 'src/modules/dashboard/services/ProjectService';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.less']
})
export class NewTaskModalComponent implements OnInit {

  constructor(
    private dashboardUiService: DashboardUiService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.selected.subscribe(selected => this.projectId = selected.project.id);
  }

  private projectId: string = '';

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    assignTo: new FormControl('', [Validators.required])
  });

  menuOpen = this.dashboardUiService.newTaskMenuOpen;
  close = () => {
    this.form.reset();
    this.dashboardUiService.toggleNewTaskMenu();
  };

  members = this.projectService.members;

  onSubmit = () => {
    if (this.form.valid) {
      const request = this.projectService.createNewTask({
        projectId: this.projectId,
        assignedTo: this.form.get('assignTo').value,
        name: this.form.get('name').value,
        description: this.form.get('description').value
      });

      request.subscribe(() => {
        this.form.reset();
        this.close();

        this.projectService.openProject(this.projectId);
      })
    }
  };

  loading = of(false);

}
