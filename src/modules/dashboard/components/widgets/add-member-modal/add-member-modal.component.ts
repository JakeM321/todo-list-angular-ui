import { Component, OnInit } from '@angular/core';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from 'src/modules/dashboard/services/ProjectService';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.less']
})
export class AddMemberModalComponent implements OnInit {

  constructor(private dashboardUiService: DashboardUiService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.selected.subscribe(selected => this.projectId = selected.project.id);
  }

  menuOpen = this.dashboardUiService.addMemberMenuOpen;

  private projectId: string = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  close = () => {
    this.form.reset();
    this.dashboardUiService.toggleAddMemberMenu();
  };

  onSubmit = () => {
    if (this.form.valid) {
      const request = this.projectService.addMember({
        projectId: this.projectId,
        email: this.form.get('email').value
      });

      request.subscribe(() => {
        this.form.reset();
        this.close();

        this.projectService.openProject(this.projectId);
      })
    }
  };

  

}
