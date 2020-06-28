import { Component, OnInit } from '@angular/core';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { ColorEvent } from 'ngx-color';
import { ProjectService } from 'src/modules/dashboard/services/ProjectService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.less']
})
export class NewProjectModalComponent implements OnInit {

  constructor(
    private dashboardUiService: DashboardUiService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dashboardUiService.newProjectMenuOpen.subscribe(open => console.log('menuOpen', open));
  }

  menuOpen = this.dashboardUiService.newProjectMenuOpen;
  close = () => {
    this.form.reset();
    this.dashboardUiService.toggleNewProjectMenu();
  };

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  loading = this.projectService.creating;
  onSubmit = () => {
    if (this.form.valid) {
      const request = this.projectService.createNewProject({ title: this.form.get('name').value, colour: this.colour.value });
      request.subscribe(response => {
        this.router.navigate([`dashboard/project/${response.id}`]);
        this.close();
      })
    }
  };

  colour = new BehaviorSubject<string>('#fff000');
  updateColour = (event: ColorEvent) => this.colour.next(event.color.hex);

}
